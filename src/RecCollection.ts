import TextRecord from './TextRecord.js'
import { RecInfo } from './types.js'

export default class RecCollection {
    private collection: TextRecord[]

    constructor() {
        this.collection = []
    }

    addRecord(rec: TextRecord): void {
        this.collection.push(rec)
    }
    out(): RecInfo[] {
        return this.collection.map((item) => {
            return { id: item.id, position: item.position, element: item.element }
        })
    }
    newOrder(recs: RecInfo[]): void {
        const newRecs: TextRecord[] = []
        // заменить позишин и пермешать массив
        this.collection.forEach((item) => {
            const index = recs.findIndex((rec) => rec.id === item.id)
            item.position = recs[index].position
            newRecs[index] = item
        })
        this.collection = newRecs
    }
    readData(data: string) {
        const templates = data.split('\r\n\r\n\r\n')
        templates.forEach((text) => {
            const record = new TextRecord(text)
            this.addRecord(record)
        })
    }
    createData(data: string) {
        const outputContainer = document.getElementById('output')
        const templatesContainer = document.getElementById('templates')

        if (templatesContainer && outputContainer) {
            const templates = data.split('\r\n\r\n\r\n')
            templates.forEach((text) => {
                const record = new TextRecord(text)
                this.addRecord(record)
                if (record.position === 1) outputContainer.appendChild(record.element)
                else templatesContainer.appendChild(record.element)
            })
        }
    }
}
