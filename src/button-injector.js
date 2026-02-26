import { QualityTracker, QualitySource } from "./quality-tracker.js";

export class ButtonInjector {
    static startButtonObserver() {
        const domObserver = new MutationObserver((() => {
            let buttonElem = document.querySelector("#sheetifier-button");
            if(buttonElem){
                return;
            }

            let profileButton = document.querySelector(".myself-profile__view-and-set-private div .button");
            if(!profileButton){
                return;
            }

            this.addButton(profileButton.parentElement);
        }));
        domObserver.observe(document, {childList: true, subtree: true});
    }

    static addButton(buttonsNode){
        let whitespace = document.createTextNode(' ');
        buttonsNode.prepend(whitespace);
        
        let button = document.createElement('span');
        button.id = "sheetifier-button"
        button.className = "button button--primary button--no-margin"
        button.innerText = "Export to CSV";
        button.onclick = () =>{
            ButtonInjector.saveQualitiesToCSV();
        }

        buttonsNode.prepend(button);
    }

    static saveQualitiesToCSV() {
        if(QualityTracker.source != QualitySource.Myself) {
            alert("The API hooks failed to detect your characters qualities. Buying or selling something small from the Bazaar may fix this. If not, check your browser's console for errors.");
            return;
        }

        const csv = QualityTracker.exportToCSV();
        this.downloadFile(`FLSheetifier-${ButtonInjector.getScrubbedCharacterName()}.csv`, csv);
    }

    static getScrubbedCharacterName() {
        let name = QualityTracker.character.name;
        name = name.replace(/[^-_a-zA-Z0-9 ]/g, "").trim();
        if(name) {
            return name;
        } else {
            return id;
        }
    }

    static downloadFile(filename, content){
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', filename);
        element.style.display = 'none';

        document.body.appendChild(element);
        element.click();
        document.removeChild(element);
    }
}