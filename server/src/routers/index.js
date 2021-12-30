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

router.post("/api/register", register);
router.post("/api/login", login);

router.get("/api/listpoke", getListPoke);
router.get("/api/getdetail/:id/", getDetailPoke);
router.post("/api/userpokes/", getUserCatchedPoke);
router.post("/api/addpoke", addPoke);
router.get("/api/catchpoke", catchPokemon);
router.post("/api/releasepoke", releasePokemon);
router.post("/api/renamepoke/:user_id/:poke_id", renamePoke);

module.exports = router;
