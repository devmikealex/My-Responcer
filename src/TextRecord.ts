export default class TextRecord {
    readonly id: string
    readonly text: string
    readonly element: HTMLDivElement
    position: number

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
    return newEl
}
