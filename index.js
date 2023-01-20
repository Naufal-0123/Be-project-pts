const express = require('express');
const fs = require('fs-extra')
const multer = require('multer');
const log = require('./SRC/middleware/log');
const routing = require('./SRC/Routes/routing');
const notFound = require('./SRC/middleware/404');
const errorHandling = require('./SRC/middleware/error');
const consoleMid1 = require('./SRC/middleware/consoleMid1')
const consoleMid2 = require('./SRC/middleware/consoleMid2')
const app = express();
require('dotenv').config()
const port = process.env.PORT || 8081

app.use(express.json())
app.use(express.static("./STORAGE/upload"))
// app.use(log);
app.use(consoleMid1);
app.use(consoleMid2);
app.use(routing);
app.use(errorHandling);
app.use(notFound);

// app.listen(port, () =>
//   console.log(`Server berjalan di http://localhost:${port}`)
// );

app.listen(port, function () {
  return console.log(`Server berjalan di http://localhost:${port}`);
});