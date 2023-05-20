const server = require("./src/app.js")
const {conn} = require("./src/db.js")
const cors = require('cors')


// Syncing all the models at once.
const port = process.env.PORT || 3001


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log("%s listening at 3000"); // eslint-disable-line no-console
  });
});