/**
 * Модуль для класса одного текстового блока
 * @module TextRecord
 */
/**
 * Класс для экземпляра одного текстового блока
 * @param {string} id - Идентификтор объекта (берется из файла)
 * @param {string} text - Сырой текст (берется из файла)
 * @param {HTMLDivElement} element - Элемент DOM для отображения на странице
 * @param {number} position - На какой панели распологать 1 для вывода / 0 в резерве
 * @export
 * @class TextRecord
 */
export default class TextRecord {
    /**
     * Creates an instance of TextRecord.
     * @param {string} data - Блок текста для парсинга из файла
     * @memberof TextRecord
     */
    constructor(data) {
        const indexForSplit = data.indexOf('\r\n');
        const firstLine = data.slice(0, indexForSplit);
        const otherText = data.slice(indexForSplit + 2);
        this.id = firstLine.slice(2);
        this.position = +firstLine.slice(0, 1);
        this.text = otherText;
        this.checked = true;
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
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    checkbox.onchange = function () {
        if (this.checked)
            newEl.classList.remove('dimmed');
        else
            newEl.classList.add('dimmed');
    };
    const copyBtn = document.createElement('button');
    // copyBtn.textContent = 'C'
    copyBtn.className = 'copyBtn';
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(rec.text);
    };
    const copyIcon = document.createElement('img');
    copyIcon.src = './assets/copy_black_24dp.svg';
    copyIcon.width = 16;
    copyIcon.style.display = 'block';
    copyBtn.append(copyIcon);
    newEl.prepend(checkbox);
    newEl.append(copyBtn);
    return newEl;
}
//# sourceMappingURL=TextRecord.js.map