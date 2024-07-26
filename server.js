const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const DATA_FILE = "urls.json";

// Чтение данных из файла
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    return {};
  }
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

// Запись данных в файл
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Валидация URL
const isValidURL = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

// POST /shorten
app.post("/shorten", (req, res) => {
  const { url } = req.body;
  if (!isValidURL(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const code = uuidv4().slice(0, 6); // Генерация рандомных значении с uuid
  const data = readData();
  data[code] = url;
  writeData(data);

  res.json({ code, redirect: `${req.protocol}://${req.get("host")}/${code}` });
});

// GET /:shortcode
app.get("/:shortcode", (req, res) => {
  const { shortcode } = req.params;
  const data = readData();

  if (data[shortcode]) {
    return res.redirect(302, data[shortcode]);
  }

  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
