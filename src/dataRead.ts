import RecCollection from './RecCollection.js'
import TextRecord from './TextRecord.js'

export default async function start() {
    const res = await fetch('./data.txt')
    const data = await res.text()
    createData(data)
}

export function createData(data: string) {
    const outputContainer = document.getElementById('output')
    const templatesContainer = document.getElementById('templates')
    const recCollection = new RecCollection()

    if (templatesContainer && outputContainer) {
        const templates = data.split('\r\n\r\n\r\n')
        templates.forEach((text) => {
            const record = new TextRecord(text)
            recCollection.addRecord(record)

            // const newEl = document.createElement('div')
            // newEl.innerHTML = record.getHTML()
            // newEl.className = 'draggable'
            // newEl.draggable = true
            // newEl.id = record.id
            // if (record.position === 1) outputContainer.appendChild(newEl)
            // else templatesContainer.appendChild(newEl)
            if (record.position === 1) outputContainer.appendChild(record.element)
            else templatesContainer.appendChild(record.element)
        })
    }
}
