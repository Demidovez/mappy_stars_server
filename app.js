import express from "express";
const app = express();

const host = "127.0.0.1";
const port = process.env.PORT || 8080;

app.get("/home", (req, res) => {
  res.status(200).type("text/plain");
  res.send("Home page");
});

app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`);
});
