const http = require("http");

const myServer = http.createServer((request, response) => {
  response.write("hello http server");
  response.write("\n");
  response.write("hello Manikanta");
  response.end();
});

myServer.listen(5500);
