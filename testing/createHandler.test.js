const { locache } = require("../Main");
const fs = require("fs");
const path = require("path");

const fileName = path.join(__dirname, ".", "testingFile", "test.json");

afterAll(async () => {
  return await fs.promises.rm(
    path.join(__dirname, "..", "/data/dataStore.json")
  );
});

describe("Create new item test case", () => {
  test("Positive Test Case - create a new item in locache", async () => {
    const testKey = "123";
    const value = {
      name: "Tester",
    };
    const ttl = 5;
    const cache = await locache
      .create(testKey, value, ttl)
      .then((res) => {
        return "Success";
      })
      .catch((err) => {
        console.log("ERR :: ", err);
      });
    expect(cache).toBeTruthy();
  });
  test("Negative Test Case - Duplicate Key", async () => {
    const testKey = "123";
    const value = {
      name: "Tester",
    };
    const ttl = 5;
    const err = await locache.create(testKey, value, ttl).catch((err) => {
      return "Error";
    });

    expect(err).toBeTruthy();
  });
  test("Negative test case - Key datatype should be string", async () => {
    const testKey = 1234;
    const value = {
      name: "Tester",
    };
    const ttl = 5;
    const err = await locache.create(testKey, value, ttl).catch((err) => {
      return "Error";
    });

    expect(err).toBeTruthy();
  });
  test("Negative test case - Key length should not exceed 32 characters", async () => {
    const testKey = "1233da71826-a05a-46f0-b7ac-ba900fcd1e5a";
    const value = {
      name: "Tester",
    };
    const ttl = 5;
    const err = await locache.create(testKey, value, ttl).catch((err) => {
      return "Error";
    });

    expect(err).toBeTruthy();
  });
  test("Negative test case - Value should be in JSON", async () => {
    const testKey = "1247";
    const value = "Good";
    const ttl = 5;
    const err = await locache.create(testKey, value, ttl).catch((err) => {
      return "Error";
    });

    expect(err).toBeTruthy();
  });
  test("Negative test case - Value should not exceed 16KB", async () => {
    const testKey = "1247";
    let value = await fs.promises
      .readFile(fileName)
      .then((res) => res.toString("utf-8"))
      .catch((err) => {
        console.log(err);
        return "";
      });
    valueParse = JSON.parse(value);
    const ttl = 5;
    const err = await locache.create(testKey, valueParse, ttl).catch((err) => {
      return "Error";
    });
    expect(err).toBeTruthy();
  });
  test("Negative test case - TTL datatype should be an integer!", async () =>{
    const testKey = "1247";
    const value = "Good";
    const ttl = "4";
    const err = await locache.create(testKey, value, ttl).catch((err) => {
      return "Error";
    });

    expect(err).toBeTruthy();
  })
});
