const express = require('express');
const cors = require('cors')
const {sequelize} = require('./SRC/models')
const routing = require('./SRC/Routes/routing');
const notFound = require('./SRC/middleware/404');
const errorHandling = require('./SRC/middleware/error');
const pageMid = require('./SRC/middleware/pageMid')
const consoleMid1 = require('./SRC/middleware/consoleMid1')
const consoleMid2 = require('./SRC/middleware/consoleMid2')
const app = express();
require('dotenv').config()
const port = process.env.PORT || 8081


app.use(express.json())
app.use(express.static("./STORAGE/upload"))
app.use(cors())
// app.use(pageMid)
// app.use(consoleMid1);
// app.use(consoleMid2);
app.use(routing);
// app.use(errorHandling);
// app.use(notFound);

app.listen(port, async() => {
  try {
    await sequelize.authenticate();
    console.log(`Server berjalan di http://localhost:${port}`);
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  
});