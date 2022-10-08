const express = require("express");
const { Mobil } = require("./models");
const app = express();
const port = 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Create cars
app.post("/cars", (req, res) => {
  const body = req.body;

  Mobil.create(body)
    .then((cars) => {
      res.status(200).json({ data: cars });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//Get all cars
app.get("/cars", (req, res) => {
  Mobil.findAll()
    .then((cars) => {
      res.status(200).json({ data: cars });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//Get data cars by id
app.get("/cars/:id", (req, res) => {
  const id = req.params.id;

  Mobil.findByPk(id)
    .then((cars) => {
      res.status(200).json({ data: cars });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.put("/cars/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  Mobil.update(body, { where: { id: id } })
    .then((cars) => {
      res.status(200).json({ data: cars });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.delete("/cars/:id", (req, res) => {
  const id = req.params.id;

  Mobil.destroy({ where: { id: id } })
    .then((cars) => {
      res.status(200).json({ data: cars });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.listen(port, () => {
  console.log("running in port", port);
});
