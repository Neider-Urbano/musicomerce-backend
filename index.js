const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { allData } = require("./src/bulkCreate.js");

conn.sync({ force: true }).then(() => {
  try {
    server.listen(4000, async() => {
      await allData();
      console.log("Data loaded");
      console.log("%s listening at 4000");
    });
  } catch (error) {
    console.log(error);
  }
});
