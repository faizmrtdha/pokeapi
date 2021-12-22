import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ pokemon, index }) => {
  return (
    <div
      className="card text-center mx-auto"
      style={{ width: "18rem" }}
      key={index}>
      <img src={pokemon.sprites.front_default} alt="asu" />
      <img src={pokemon.sprites.back_default} alt="asu" />
      <div className="card-header">
        <h5 className="card-title">{pokemon.name}</h5>
      </div>
      <div className="card-body">
        <a href={pokemon.url} className="card-link">
          Catch {pokemon.name}
        </a>
      </div>
    </div>
  );
};

export default Cards;
