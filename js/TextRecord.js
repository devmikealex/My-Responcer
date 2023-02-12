export default class TextRecord {
    constructor(data) {
        const indexForSplit = data.indexOf('\r\n');
        const firstLine = data.slice(0, indexForSplit);
        const otherText = data.slice(indexForSplit + 2);
        this.id = firstLine.slice(2);
        this.position = +firstLine.slice(0, 1);
        this.text = otherText;
        this.element = createHTML(this);
    }
    getHTML() {
        return this.text.replaceAll('\r\n', '<br>');
    }
}
function createHTML(rec) {
    const newEl = document.createElement('div');
    newEl.innerHTML = rec.getHTML();
    newEl.className = 'draggable';
    newEl.draggable = true;
    newEl.id = rec.id;
    return newEl;
}
//# sourceMappingURL=TextRecord.js.map