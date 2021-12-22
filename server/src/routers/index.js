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

router.get("/api/listpoke", getListPoke);
router.get("/api/detailpoke/:id/", getDetailPoke);
router.get("/api/userPokes", getUserCatchedPoke);
router.post("/api/addpoke", addPoke);
router.post("/api/catchpoke", catchPokemon);
router.post("/api/releasepoke", releasePokemon);
router.post("/api/renamepoke/:user_id/:poke_id", renamePoke);

module.exports = router;
