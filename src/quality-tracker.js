import { CSVBuilder } from "./csv-builder.js";

export const QualitySource = {
    None: 0,
    Myself: 1
}

export class QualityTracker {
    /**
     * There is a separate content script linked to the extension
     * and run in the MAIN world (ie. the page's context instead
     * of the isolated extension context) that peeks at the API
     * requests and sends these messages.
     * 
     * The structure of this is simple, but landing on it was a
     * huge pain. The ability to run content scripts in the page
     * context seems to be a newer one so it was very difficult
     * to find, and the other script injection solutions you're
     * likely to encounter are either too slow to catch the initial
     * MYSELF call, or run afoul of CSP restrictions in Chrome.
     */
    static listenForInterceptions() {
        window.addEventListener('message', (event) => {
            if (event.source !== window) {
                return;
            }

            if (event.data && event.data.source === 'flsheetifier-interceptor') {
                const message = event.data.payload;
                const jsonData = JSON.parse(message.data);
                switch(message.type) {
                    case "myself":
                        QualityTracker.onMyself(jsonData);
                        break;
                    case "branch":
                        QualityTracker.onBranch(jsonData);
                        break;
                    case "onExchange":
                        QualityTracker.onMyself(jsonData);
                        break;
                    case "agents":
                        QualityTracker.onAgents(jsonData);
                        break;
                    default:
                        break;
                }
            }
        });
    }
    
    static character = {};
    static qualities = {};
    static source = QualitySource.None;

    static onMyself(response) {
        let newQualities = {};
        response.possessions.forEach((category) => {
            category.possessions.forEach((quality) =>{
                newQualities[quality.id] = quality;
            });
        });

        QualityTracker.source = QualitySource.Myself;
        QualityTracker.character = response.character;
        QualityTracker.qualities = newQualities;
    }

    static onBranch(response) {
        if (response.messages?.length > 0){
            response.messages.forEach((message) =>{
                if (message.possession){
                    QualityTracker.qualities[message.possession.id] = message.possession;
                }
            });
        }
    }

    static onExchange(response) {
        if (response.possessionsChanged?.length > 0){
            response.possessionsChanged.forEach(quality => {
                QualityTracker.qualities[quality.id] = quality;
            });
        }
    }

    static onAgents(response) {
        if (response.agents?.length > 0) {
            response.agents.forEach(agent => {
                QualityTracker.qualities[agent.id] = {
                    "id": agent.id,
                    "name": agent.name,
                    "nameAndLevel": `1 x ${agent.name}`,
                    "description": agent.description,
                    "image": agent.image,
                    "level": 1,
                    "effectiveLevel": 1,
                    "nature": "Thing",
                    "category": "Agents",
                    "equippable": false,
                    "allowedOn": "Character",
                    "himbleLevel": 0,
                    "progressAsPercentage": -1
                };
            });
        }
    }

    static getAll()
    {
        let result = [];
        for(const id in QualityTracker.qualities) {
            result.push(QualityTracker.qualities[id]);
        }
        return result;
    }

    static exportToCSV()
    {
        let qualities = QualityTracker.getAll();
        const builder = new CSVBuilder();
        
        builder.addRow([
            "id",
            "name",
            "level",
            "effectiveLevel",
            "cap",
            "category",
            "nature"
        ]);

        qualities.forEach(quality => {
            builder.addRow([
                quality.id,
                quality.name,
                quality.level,
                quality.effectiveLevel,
                quality.cap ?? "",
                quality.category,
                quality.nature
            ]);
        });

        return builder.result;
    }
}