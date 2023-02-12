export default class RecCollection {
    constructor() {
        this.collection = [];
    }
    addRecord(rec) {
        this.collection.push(rec);
    }
    out() {
        return this.collection.map((item) => item.id);
    }
}
//# sourceMappingURL=RecCollection.js.map