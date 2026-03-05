export class CSVBuilder {
    constructor() {
        this.result = "";
    }

    addCell(value){
        if(this.result.slice(-1) == "\""){
            this.result += ",";
        }

        let str;
        if (value === undefined || value === null) {
            str = "";
        } else {
            str = String(value);
        }
        str = str.replace(`"`, `""`);
        this.result += `"${str}"`;
    }

    addRow(values) {
        if(this.result.slice(-1) == "\""){
            this.result += "\n";
        }
        if(values){
            values.forEach((val) => {
                this.addCell(val);
            });
        }
    }
}