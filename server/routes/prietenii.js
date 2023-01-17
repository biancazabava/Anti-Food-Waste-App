const Utilizator = require("../models/utilizator");
const Prietenie = require("../models/prietenie");
const router = require("express").Router();

//verif id
const checkId = (req, res, next) => {
  if (req.params.id && isNaN(req.params.id)) {
    res.status(400).json({ error: "wrong input for id" });
  } else {
    next();
  }
};
//verificare prietenie
router.route("/getFriendship/:id").get(checkId, async (req, res) => {
  try {
    const prietenie = await Prietenie.findByPk(req.params.id);
    if (prietenie) {
      res.status(200).json(prietenie);
    } else {
      res.status(404).json({
        error: `Prietenia cu id ${req.params.id} nu a fost gasit!`,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//afisare lista prietenii

//adaugare in lista prieteni
router.route("/addFriend/:idUser").post(async (req, res) => {
  try {
    const newPrietenie = await Prietenie.create({
      user_one: req.params.idUser,
      user_two: req.body.user_two,
    });
    res.status(200).json(Prietenie);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
