const fs = require("fs");
const path = require("path");
const { Validate } = require("../Validate");
const { errorHandler } = require("../error/error");

const fileName = path.join(__dirname, "..", "data", "dataStore.json");

class FileClass {
  /**
   * Writes data to the data store JSON file
   * @param {*} key
   * @param {*} value
   * @param {*} lifeTime
   */
  static async writeFile(key, value, lifeTime) {
    lifeTime = lifeTime;
    const dataObj = await this.readFile(key, value);
    return await fs.promises.writeFile(
      fileName,
      JSON.stringify(
        {
          root: { ...dataObj },
        },
        null,
        2
      )
    );
  }

  /**
   * Reads the JSON data file and returns the existing object when client create a new object
   * @param {*} key
   * @param {*} value
   */
  static async readFile(key, value) {
    if (fs.existsSync(fileName)) {
      let data = await fs.promises
        .readFile(fileName)
        .then((res) => res.toString("utf-8"))
        .catch((err) => {
          console.log(err);
          return "";
        });
        if(typeof key === "string"){
          const dataValid = await Validate.createValidate(key, value, data);
          return dataValid;
        }
        else{
          return data;
        }
    } else {
      if(key && value){
        return { [key]: { value: value, expire: false } };
      }
      else{
        return errorHandler("File doesn't exists!!");
      }
    }
  }
}

exports.FileClass = FileClass;
