const server = require("./src/app.js")
const {conn} = require("./src/db.js")
const cors = require('cors')


// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.use(cors())
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
