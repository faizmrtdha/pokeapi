import React from "react";
import Cards from "../card-poke/Cards";

// class PokeList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       pokemons: [],
//       pokemonDetails: [],
//     };
//   }

//   render() {
//     const {
//       data: pokemons,
//       dataDetails: pokemonDetails,
//       error,
//       loading,
//     } = useFetch();
//     return (
//       <div className="poke-list">
//         <div className="container">
//           <div className="poke-card">
//             {error && <div>{error}</div>}
//             {loading && <div>Loading</div>}
//             {!loading && pokemons.map((pokemon) => <Cards pokemon={pokemon} />)}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default PokeList;

const PokeList = ({ pokemons }) => {
  return (
    <div className="poke-list">
      <div className="container">
        <div className="poke-card">
          {pokemons.map((pokemon, index) => (
            <Cards pokemon={pokemon.data} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokeList;
