const { Locache } = require("../Main");
const { FileClass } = require("../fileOperation/FileClass");
const { GlobalData } = require("../DAO/GlobalData");

const obj = new Locache();

describe("Read item test case", () => {
  test("Positive test case - Read value based on the given key", async () => {
    const key = "11";
    await obj.create(key, { name: "123" }, 10);
    const value = await obj
      .read(key)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("ERR :: ", err);
      });
    expect(value).toBeTruthy();
  });

  test("Negative test case - Invalid key", async () => {
    const key = "12";
    await obj.create("12358", { name: "123" }, 10);
    const err = await obj.read(key).catch((err) => {
      return "Error";
    });

    expect(err).toBeTruthy();
  });

  test("Negative test case - File doesnot exists", async () => {
    const key = "25";
    const err = await obj.read(key).catch((err) => {
      return "Error";
    });
    expect(err).toBeTruthy();
  });

  test("Negative test case - Key exceeded TTL", async () => {
    const key = "1";
    await obj.create(key, { name: "123" }, 1);
    GlobalData.updateItem(key, true);
    await FileClass.updateFile(key, true);
    const err = await obj.read(key).catch((err) => {
      return "Error";
    });
    expect(err).toBeTruthy();
  });
});
