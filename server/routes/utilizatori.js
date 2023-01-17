const Aliment = require("../models/aliment");
const Utilizator = require("../models/utilizator");
const router = require("express").Router();

Utilizator.hasMany(Aliment);

const checkId = (req, res, next) => {
  if (req.params.id && isNaN(req.params.id)) {
    res.status(400).json({ error: "wrong input for id" });
  } else {
    next();
  }
};

router.route("/getUtilizator/:id").get(checkId, async (req, res) => {
  try {
    const utilizator = await Utilizator.findByPk(req.params.id);
    if (utilizator) {
      res.status(200).json(utilizator);
    } else {
      res.status(404).json({
        error: `Utilizatorul cu id ${req.params.id} nu a fost gasit!`,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.route("/getUtilizatori").get(async (req, res) => {
  const { simplified } = req.query;
  const { pIsDone } = req.query;
  try {
    const utilizatori = await Utilizator.findAll({
      attributes: simplified ? { exclude: "id" } : undefined,
      where: pIsDone ? { isDone: Boolean(pIsDone) } : undefined,
    });
    res.status(200).json(utilizatori);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.route("/users/:utilizatorId/food").post(async (req, res) => {
  try {
    const utilizator = await Utilizator.findByPk(req.params.utilizatorId);
    if (utilizator) {
      const alimentNou = new Aliment(req.body);
      alimentNou.utilizatorId = utilizator.id;
      await newFood.save();
      res.status(200).json({ message: "food item added!" });
    } else {
      res.status(404).json({
        error: `utilizatorul cu id-ul ${req.params.utilizatorId} nu a fost gasit!`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.route("/addUser").post(async (req, res) => {
  try {
    const newUtilizator = await Utilizator.create(req.body);
    res.status(200).json(Utilizator);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await Utilizator.findOne({
      where: { username: req.body.username },
    });
    if (user == null) {
      res.status(404).json({ message: "User not found" });
    } else {
      if (req.body.password === user.password) {
        res
          .status(201)
          .json({ message: "Login successfully", userId: user.id });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: { err } });
  }
});

module.exports = router;
