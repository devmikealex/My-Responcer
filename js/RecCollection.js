import TextRecord from './TextRecord.js';
export default class RecCollection {
    constructor() {
        this.collection = [];
    }
    addRecord(rec) {
        this.collection.push(rec);
    }
    out() {
        return this.collection.map((item) => {
            return { id: item.id, position: item.position };
        });
    }
    createData(data) {
        const outputContainer = document.getElementById('output');
        const templatesContainer = document.getElementById('templates');
        if (templatesContainer && outputContainer) {
            const templates = data.split('\r\n\r\n\r\n');
            templates.forEach((text) => {
                const record = new TextRecord(text);
                this.addRecord(record);
                if (record.position === 1)
                    outputContainer.appendChild(record.element);
                else
                    templatesContainer.appendChild(record.element);
            });
        }
    }
}
//# sourceMappingURL=RecCollection.js.map