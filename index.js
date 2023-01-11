const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req,res) => {
  res.send("Hello World")
})

app.get("/user", (req,res) => {
  res.send({
    status: "success",
    message: "Dzakwan"
  })
})

app.listen(port, () =>
  console.log(`Server berjalan di http://localhost:${port}`)
);
