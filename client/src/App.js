import React, { useEffect, useState } from "react";
import Topbar from "./components/topbar/Topbar";
import PokeList from "./components/poke-list/PokeList";
import { getPokemonDetails } from "./hooks/PokeService";

function App() {
  useEffect(async () => {
    try {
      const pokemons = await getPokemonDetails();
      setPokeList(pokemons);
    } catch (e) {
      throw e;
    }
  }, []);

  const [pokeList, setPokeList] = useState([]);
  console.log(pokeList);
  return (
    <div className="app-container">
      <Topbar />
      <PokeList pokemons={pokeList} />
      {/* <Coba /> */}
    </div>
  );
}

export default App;
