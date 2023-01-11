const http = require("http");
const dayjs = require("dayjs");
const {smk, cekBilangan} = require("./example")
const server = http
  .createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "plain-text");
    // res.setHeader("Content-Type", "text-json");
    // res.write("Hello World");
    res.write(smk);
    res.write(cekBilangan(5));
    res.write(dayjs().format('YYYY-MM-DD-HH:mm'));
    
    // res.write(
    //   JSON.stringify({
    //     status: "success",
    //     mesage: "response success",
    //     data: {
    //       bilangan: cekBilangan(5),
    //       smk: smk,
    //       hari: dayjs().format('YYYY-MM-DD-HH:mm'),
    //     },
    //   })
    // );

    res.end();
  })
//   .listen(8087, () => {
//     console.log(`server berjalan`);
//   });

  const hostname = "localhost";
  const port = 8087;
  server.listen(port, hostname, ()=> {
    console.log(`Server running at http://localhost:8087`);
  });
