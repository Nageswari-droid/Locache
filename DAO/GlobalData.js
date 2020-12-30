class GlobalData {
  static dataStore = {};

  static addItem = (dataObj) => {
    this.dataStore.root = dataObj;
    console.log(JSON.stringify(this.dataStore, null, 2));
  };

  static readItem = () => {};

  static deletItem = () => {};
}

exports.GlobalData = GlobalData;
