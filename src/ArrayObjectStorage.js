
class ArrayObjectStorage {
  constructor(key, type, prefix = '') { // type es el tipo de objeto que se va a guardar
    this._key = key
    this._type = type;
    this._prefix = prefix;
  }
  set key(value) { } // No se puede cambiar el key
  set type(value) { } // No se puede cambiar el type
  set prefix(value) { } // No se puede cambiar el type

  get key() {
    return this._key;
  }
  get type() {
    return this._type;
  }
  get prefix() {
    return this._prefix;
  }
  get prefixKey() {
    return this.prefix + this.key;
  }

  setItem(value) {
    // let items;
    // if (Array.isArray(value)) {
    //   items = value;
    // } else {
    //   items = [value];
    // }
    // items = this.getItem().concat(items); 
    localStorage.setItem(this.prefixKey, JSON.stringify(value));
  }
  getItem() {
    let items;
    if (localStorage.getItem(this.prefixKey) === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem(this.prefixKey));
    }
    return items;
  }
  saveObject(item) {
    if (item instanceof this.type) {
      let items;
      items = this.getsObject();
      items.push(item);
      this.setItem(items);
    }
  }

  getsObject() {
    let items = this.getItem();
    let itemsObject = [];
    items.forEach(item => {
      let data = {};
      for (let i in item) {
        if (i[0] == '_') data[i.substring(1)] = item[i];
        else data[i] = item[i];
      }
      itemsObject.push(new this.type({ ...data }));
    });
    return itemsObject;
  }

  deleteIndex(index) {
    let items;
    items = getsObject();
    items.forEach((item, i) => {
      if (i === index) {
        item.splice(i, 1);
      }
    });
    this.setItem(items);
  }

}
export {
  ArrayObjectStorage
};