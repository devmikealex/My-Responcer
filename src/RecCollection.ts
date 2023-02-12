import TextRecord from './TextRecord.js'

export default class RecCollection {
    private collection: TextRecord[]

    constructor() {
        this.collection = []
    }

    addRecord(rec: TextRecord) {
        this.collection.push(rec)
    }
    out() {
        return this.collection.map((item) => item.id)
    }
}
