class ObjectStorage {

  constructor() {

    this.data = {}

  }

  get(key) {

    if (this.data[key] === undefined) {
      this.data[key] = []
    }

    return this.data[key]

  }

}
