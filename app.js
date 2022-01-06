import express from "express";
import path from "path";
import fs from "fs";
import fetch from "node-fetch";

const fsPromises = fs.promises;
const app = express();
const host = "0.0.0.0";
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/home", (req, res) => {
  res.status(200).type("text/plain");
  res.send("Home page");
});

// Отправляем в телегу проблему пользователя
app.post("/send_problem", (req, res) => {
  res.status(200);
  res.send("OK");

  const data = req.body;

  fetch("http://172.17.0.1:8081/add_problem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  console.log("USER PROBLEM: " + data);
});

// Достаем одно изображение
app.get("/holst_image/:folder/:name", (req, res) => {
  let filepath = "";

  const folder = req.params.folder;
  const imageName = req.params.name;

  filepath = path.resolve("holst_images/" + folder + "/" + imageName);

  res.status(200).type("image/jpeg");
  res.sendFile(filepath);
});

// Достаем список всех превью изображений
app.get("/get_preview_images", async (req, res) => {
  const images = [];

  await fsPromises
    .readdir(path.resolve("holst_images/preview/"))
    .then((fileNames) => {
      fileNames.forEach((file) => {
        images.push("http://188.138.69.104:8080/holst_image/preview/" + file);
      });
    });

  res.status(200).type("text/plain");
  res.json(images);
});

app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port} :: ${new Date()}`);
});
