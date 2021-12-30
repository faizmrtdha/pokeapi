import React, { createContext, useEffect, useState } from "react";
import { API } from "../../hooks/Api";
import { getPokemon, getPokemonDetails } from "../../hooks/PokeService";

export const PokemonContext = createContext();

export const PokemonContextProvider = (props) => {
  const [pokemons, setPokemons] = useState([]);
  const [listPoke, setListPoke] = useState([]);
  // const [pokemonDetails, setPokemonDetails] = useState([]);

  const local = JSON.parse(localStorage.getItem("user"));

  const fetchPoke = async () => {
    try {
      const response = await getPokemonDetails();
      setPokemons(response);
    } catch (e) {
      throw e;
    }
  };

  const userPoke = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await API.post(
        `/userpokes`,
        {
          user_id: local.user.id,
        },
        config
      );
      setListPoke(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPoke();
    userPoke();
  }, []);

  const providerValue = { pokemons, listPoke };
  return (
    <PokemonContext.Provider value={providerValue}>
      {props.children}
    </PokemonContext.Provider>
  );
};
