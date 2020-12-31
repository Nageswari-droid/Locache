const { locache } = require("../Main");
const { FileClass } = require("../fileOperation/FileClass");
const { GlobalData } = require("../DAO/GlobalData");

describe("Delete item test case", () => {
  test("Positive test case - Delete an item", async () => {
    const key = "11";
    await locache.create(key, { name: "123" }, 10);
    const value = await locache
      .delete(key)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("ERR :: ", err);
      });
    expect(value).toBeTruthy();
  });
  test("Negative test case - Invalid key", async () => {
    const key = "10";
    await locache.create("1258", { name: "123" }, 1);
    const err = await locache.delete(key).catch((err) => {
      return "Error";
    });

    expect(err).toBeTruthy();
  });

  test("Negative test case - File doesnot exists", async () => {
    const key = "25";
    const err = await locache.delete(key).catch((err) => {
      return "Error";
    });
    expect(err).toBeTruthy();
  });

  test("Negative test case - Key exceeded TTL", async () => {
    const key = "2";
    await locache.create(key, { name: "123" }, 1);
    GlobalData.updateItem(key, true);
    await FileClass.updateFile(key, true);
    const err = await locache.delete(key).catch((err) => {
      return "Error";
    });
    expect(err).toBeTruthy();
  });
});
