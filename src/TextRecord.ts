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
    readonly id: string
    readonly text: string
    readonly element: HTMLDivElement
    position: number

    /**
     * Creates an instance of TextRecord.
     * @param {string} data - Блок текста для парсинга из файла
     * @memberof TextRecord
     */
    constructor(data: string) {
        const indexForSplit = data.indexOf('\r\n')
        const firstLine = data.slice(0, indexForSplit)
        const otherText = data.slice(indexForSplit + 2)

        this.id = firstLine.slice(2)
        this.position = +firstLine.slice(0, 1)
        this.text = otherText

        this.element = createHTML(this)
    }

    getHTML() {
        return this.text.replaceAll('\r\n', '<br>')
    }
}

function createHTML(rec: TextRecord): HTMLDivElement {
    const newEl = document.createElement('div')
    newEl.innerHTML = rec.getHTML()
    newEl.className = 'draggable'
    newEl.draggable = true
    newEl.id = rec.id

    const newCheck = document.createElement('input') as HTMLInputElement
    newCheck.type = 'checkbox'
    newCheck.checked = true

    newEl.prepend(newCheck)
    return newEl
}
