const express = require("express");
const path = require("path");
const app = express();
const flash = require("connect-flash");
const session = require("express-session");
const axios = require("axios");
const uploadOnMemory = require("../uploadOnMemory");
const cloudinary = require("../cloudinary");

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3000;

app.use(
  session({
    secret: "dinniazmi",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());

app.get("/", async (req, res) => {
  try {
    const cars = await axios.get("http://localhost:8001/cars/");
    //console.log(mobils);
    res.render("cars", {
      cars: cars.data,
      hapus: req.flash("hapus"),
      tambah: req.flash("tambah"),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/add-cars", (req, res) => {
  res.render("create");
});

app.post("/add-cars", uploadOnMemory.single("picture"), (req, res) => {
  const fileBase64 = req.file.buffer.toString("base64");
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;

  cloudinary.uploader.upload(file, async function (err, result) {
    if (!!err) {
      console.log(err);
      return res.status(400).json({
        message: "Gagal upload file!",
      });
    }

    const body = req.body;
    body.image = result.url;
    try {
      const cars = await axios.post("http://localhost:8001/cars", body);
      req.flash("tambah", "Data Berhasil Ditambah"), res.redirect("/");
    } catch (err) {
      return res.status(500).json(err);
    }
  });
});

app.get("/update-cars/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const cars = await axios.get(`http://localhost:8001/cars/${id}`);
    res.render("update", cars.data);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/update-cars/:id", uploadOnMemory.single("picture"), (req, res) => {
  const fileBase64 = req.file.buffer.toString("base64");
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;

  cloudinary.uploader.upload(file, { folder: "test" }, async function (err, result) {
    if (!!err) {
      console.log(err);
      return res.status(400).json({
        message: "Gagal upload file!",
      });
    }

    const id = req.params.id;
    const body = req.body;
    body.image = result.url;
    try {
      const cars = await axios.put(`http://localhost:8001/cars/${id}`, body);
      return res.redirect("/");
    } catch (err) {
      return res.status(500).json(err);
    }
  });
});

app.get("/delete-cars/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await axios.delete(`http://localhost:8001/cars/${id}`);
    req.flash("hapus", "Data Berhasil Dihapus"), res.redirect("/");
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
