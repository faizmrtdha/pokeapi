const { Router } = require("express");
const { register, login } = require("../controllers/User");
const {
  getListPoke,
  getDetailPoke,
  addPoke,
  catchPokemon,
  releasePokemon,
  getUserCatchedPoke,
  renamePoke,
} = require("../controllers/pokeApi/pokeApi");

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/listpoke", getListPoke);
router.get("/detailpoke/:id/", getDetailPoke);
router.get("/userPokes", getUserCatchedPoke);
router.post("/addpoke", addPoke);
router.post("/catchpoke", catchPokemon);
router.post("/releasepoke", releasePokemon);
router.post("/renamepoke/:user_id/:poke_id", renamePoke);

module.exports = router;
