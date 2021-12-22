import axios from "axios";
// import { useEffect, useState } from "react";

// const useFetch = () => {
//   const [data, setData] = useState([]);
//   const [dataDetails, setDataDetails] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           "https://pokeapi.co/api/v2/pokemon?limit=20"
//         );
//         const other = response.data.results;
//         setData(other);
//         other.map((oth) =>
//           axios.get(oth.url).then((res) => {
//             const yuhu = res.data;
//             setDataDetails(yuhu);
//           })
//         );
//         // const responsePoke = data.map((d) =>
//         //   axios.get(d.url).then((res) => {
//         //     const yuhu = res.data;
//         //     // yuhu.push(data);
//         //     console.log(yuhu);
//         //     console.log(data);
//         //   })
//         // );
//       } catch (e) {
//         setError(e);
//       }
//       setLoading(false);
//     }
//     fetchData();
//   }, []);
//   return { data, dataDetails, error, loading };
// };

// export default useFetch;

export const getPokemon = async () => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=20"
    );
    return response.data.results;
  } catch (e) {}
};

export const getPokemonData = async (url) => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (e) {
    throw e;
  }
};

export const getPokemonDetails = async () => {
  try {
    const pokemons = await getPokemon();
    const pokemonPromises = pokemons.map((poke) => getPokemonData(poke.url));
    return await Promise.all(pokemonPromises);
  } catch (e) {
    throw e;
  }
};
