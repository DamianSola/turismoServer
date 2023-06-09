const server = require("./src/app.js")
const {conn} = require("./src/db.js")
const cors = require('cors')

server.use(cors())
// Syncing all the models at once.
const port = process.env.PORT || 3001


// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    console.log("%s listening at 3000"); // eslint-disable-line no-console
  });
});