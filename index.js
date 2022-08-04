const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { allData } = require("./src/bulkCreate.js");

conn.sync({ force: true }).then(async () => {
  try {
    await allData();
    console.log("Data loaded");

    server.listen(3000, () => {
      console.log("%s listening at 3000");
    });
  } catch (error) {
    console.log(error);
  }
});
