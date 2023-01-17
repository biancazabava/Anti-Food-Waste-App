const Aliment = require("../models/aliment");
const Utilizator = require("../models/utilizator");
const router = require("express").Router();

//verif id
const checkId = (req, res, next) => {
  if (req.params.id && isNaN(req.params.id)) {
    res.status(400).json({ error: "wrong input for id" });
  } else {
    next();
  }
};

//get un aliment
router.route("/getAlimente/:id").get(checkId, async (req, res) => {
  try {
    const aliment = await Aliment.findByPk(req.params.id);
    if (aliment) {
      res.status(200).json(aliment);
    } else {
      res
        .status(404)
        .json({ error: `Alimentul cu id ${req.params.id} nu a fost gasit!` });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//get toate alimentele
router.route("/getAlimente").get(async (req, res) => {
  const { simplified } = req.query;
  const { pIsDone } = req.query;
  try {
    const alimente = await Aliment.findAll({
      attributes: simplified ? { exclude: "id" } : undefined,
      where: pIsDone ? { isDone: Boolean(pIsDone) } : undefined,
    });
    res.status(200).json(alimente);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get alimentele unui utilizator
router
  .route("/utilizatori/:utilizatorId/alimente")
  .get(checkId, async (req, res) => {
    try {
      const utilizator = await Utilizator.findByPk(req.params.utilizatorId, {
        include: [Aliment],
      });
      if (utilizator) {
        res.status(200).json(utilizator.Aliments);
      } else {
        res.status(404).json({
          error: `Utilizatorul cu id ${req.params.utilizatorId} nu a fost gasit!`,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });

//adauga un aliment unui utilizator
router.route("/users/:utilizatorId/aliment").post(async (req, res) => {
  try {
    const utilizator = await Utilizator.findByPk(req.params.utilizatorId);
    if (utilizator) {
      if (
        !req.body.denumire ||
        !req.body.data_expirare ||
        !req.body.categorie
      ) {
        return res.status(400).json({ message: "date incorecte" });
      }
      // incercam sa setam alerta la 1 daca este data expirarii in mai putin de 7 zile
      // var data_exp = new Date(req.body.data_expirare).getTime();
      // var newAlert;
      // if (data_exp - Date.now < 1000 * 60 * 60 * 24 * 7) {
      //   console.log(data_exp - Date.now);
      //   newAlert = 1;
      // } else newAlert = 0;
      const newAliment = new Aliment({
        //id: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
        disponibilitate: "Indisponibil",
        denumire: req.body.denumire,
        categorie: req.body.categorie,
        data_expirare: req.body.data_expirare,
        UtilizatorId: utilizator.id,
        alert: 0,
      });
      await newAliment.save();
      return res.status(200).json(newAliment);
    } else {
      return res.status(404).json({
        error: `Utilizatorul cu id ${req.params.utilizatorId} nu a fost gasit!`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//schimba disponibilitatea unui aliment
router.put("/alimente/:alimentId", async (req, res) => {
  try {
    const aliment = await Aliment.findByPk(req.params.alimentId);
    if (aliment) {
      if (aliment.disponibilitate === "Disponibil") {
        aliment.disponibilitate = "Indisponibil";
      } else {
        aliment.disponibilitate = "Disponibil";
      }
      await aliment.save();
      res.status(200).json({ message: "Alimentul a fost actualizat" });
    } else {
      res.status(404).json({
        error: `Alimentul cu id ${req.params.alimentId} nu a fost gasit`,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//schimba alerta unui aliment

router.put("/alimentealert/", async (req, res) => {
  try {
    const aliment = await Aliment.findByPk(req.body.alimentId);
    if (aliment) {
      aliment.alert = true;
      await aliment.save();
      res.status(200).json({ message: "Alimentul a fost actualizat" });
    } else {
      res.status(404).json({
        error: `Alimentul cu id ${req.body.alimentId} nu a fost gasit`,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//sterge un aliment din baza de date
router.delete("/alimente/delete", async (req, res) => {
  try {
    if (req.body.id) {
      const aliment = await Aliment.findByPk(req.body.id);
      if (aliment) {
        await aliment.destroy();
        res.status(200).json({ message: "Alimentul a fost sters" });
      } else {
        res.status(404).json({
          error: `Alimentul cu id ${req.body.id} nu a fost gasit`,
        });
      }
    } else res.status(400).json({ message: "id nu poate fi nul" });
  } catch (error) {
    res.status(500).json(error);
  }
});

//transfer aliment la alt utilizator, schimband utilizatorId al alimentului
router.put("/alimente", async (req, res) => {
  try {
    const aliment = await Aliment.findByPk(req.body.id);
    if (aliment) {
      aliment.UtilizatorId = req.body.UtilizatorId;
      await aliment.save();
      res.status(200).json({ message: "Alimentul a fost actualizat" });
    } else {
      res.status(404).json({
        error: `Alimentul cu id ${req.body.id} nu a fost gasit`,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
