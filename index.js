const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname + "/public")));

const routes = ["/", "/about", "/contact"];

routes.forEach((route) => {
  app.get(route, (req, res) => {
    const filename =
      route === "/" ? "./index.html" : "." + route.split(".")[0] + ".html";

    fs.readFile(filename).then((data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  });
});

app.use((req, res, next) => {
  fs.readFile("./404.html").then((data) => {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(data);
  });
});

app.listen(8080);
