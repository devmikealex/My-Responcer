import TextRecord from './TextRecord.js';
import Viewer from './Viewer.js';
const viewer = new Viewer();
export default class RecCollection {
    constructor() {
        this.mySkills = '';
        this.collection = [];
        // document.getElementById('CopyBTN')?.addEventListener('click', this.copyText)
        // document.getElementById('SaveBTN')?.addEventListener('click', this.saveData)
        // document.getElementById('LoadBTN')?.addEventListener('click', this.loadData)
        // document.getElementById('LoadCLR')?.addEventListener('click', this.clearData)
    }
    addRecord(rec) {
        this.collection.push(rec);
    }
    out() {
        return this.collection.map((item) => {
            return { id: item.id, position: item.position, element: item.element };
        });
    }
    newOrder(recs) {
        const newRecs = [];
        // заменить позишин и пермешать массив
        this.collection.forEach((item) => {
            const index = recs.findIndex((rec) => rec.id === item.id);
            item.position = recs[index].position;
            newRecs[index] = item;
        });
        this.collection = newRecs;
    }
    setChecked(recs) {
        this.collection.forEach((item) => {
            const index = recs.findIndex((rec) => rec.id === item.id);
            item.checked = !!recs[index].checked;
            item.element.getElementsByTagName('input')[0].checked = item.checked;
        });
    }
    readData(data) {
        const templates = data.split('\r\n\r\n\r\n');
        templates.forEach((text) => {
            const record = new TextRecord(text);
            this.addRecord(record);
        });
    }
    saveData() {
        const t = JSON.stringify(this.collection.map((item) => {
            const checked = item.element.getElementsByTagName('input')[0].checked; // значение чекбокса
            return { id: item.id, position: item.position, checked };
        }));
        console.log(t);
        this.log('Save data');
        localStorage.setItem('RecInfo', t);
    }
    loadData() {
        const t = localStorage.getItem('RecInfo');
        if (t) {
            this.log('Load data');
            console.log('localStorage =', t);
            const newOrder = JSON.parse(t);
            this.newOrder(newOrder);
            this.setChecked(newOrder);
            this.render();
        }
        else {
            this.log('Settings Not found');
        }
    }
    clearData() {
        this.log('Clear data');
        localStorage.removeItem('RecInfo');
    }
    copyText() {
        this.log('Copy to clipboard');
        const a = this.getText();
        navigator.clipboard.writeText(a);
        console.log('----------------------------');
        console.log(a);
    }
    render() {
        viewer.render(this.out());
    }
    log(message) {
        viewer.log(message);
    }
    getText() {
        // console.log(this.collection[0].element)
        // const a = this.collection[0].element.getElementsByTagName('input')
        // console.log('🚀', a[0].checked)
        // return 'aa'
        return this.collection
            .filter((item) => {
            const checked = item.element.getElementsByTagName('input')[0].checked; // значение чекбокса
            return item.position === 1 && checked;
        })
            .map((item) => item.text)
            .join('\r\n\r\n')
            .replace('%mySkills%', this.mySkills);
    }
    updateAfterDrag() {
        const newOrder = viewer.getRecOrder();
        this.newOrder(newOrder);
        this.render();
    }
}
//# sourceMappingURL=RecCollection.js.map