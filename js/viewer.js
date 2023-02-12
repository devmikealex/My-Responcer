import TextRecord from './TextRecord.js';
// TODO как бы их все писать в одном месте для всех файлов
const outputContainer = document.getElementById('output');
const templatesContainer = document.getElementById('templates');
export default class Viewer {
    createData(data) {
        const arr = [];
        if (templatesContainer && outputContainer) {
            const templates = data.split('\r\n\r\n\r\n');
            templates.forEach((text) => {
                const record = new TextRecord(text);
                arr.push(record);
                if (record.position === 1)
                    outputContainer.appendChild(record.element);
                else
                    templatesContainer.appendChild(record.element);
            });
        }
        return arr;
    }
    render(recInfo) {
        // if (templatesContainer && outputContainer) {
        recInfo.forEach((rec) => {
            if (rec.element) {
                if (rec.position === 1)
                    outputContainer.appendChild(rec.element);
                else
                    templatesContainer.appendChild(rec.element);
            }
        });
        // }
    }
    getRecOrder() {
        let arr = [];
        const draggables = [...document.querySelectorAll('.draggable')];
        arr = draggables.map((item) => {
            return { id: item.id, position: item.parentElement?.id === 'output' ? 1 : 0 };
        });
        return arr;
    }
}
//# sourceMappingURL=Viewer.js.map