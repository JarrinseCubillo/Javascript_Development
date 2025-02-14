import {orderNumber,formatPokemonId} from "./simpleFunctions.js"

const imgOptions ={};
  const imgObserver = new IntersectionObserver
  ((entries,imgObserver)=>{
    entries.forEach((entry)=>{
      if(!entry.isIntersecting) return;
      const img = entry.target;
      img.src = img.getAttribute("data-image")
      imgObserver.unobserve(img);
    })
  },imgOptions)
  
const fetchPokemons = async (endpoint) => {
    let data;
    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        data = await response.json();
    } catch (error) {
        console.error(error);
    }

    return data.pokemon_species;
}

export const getPokemons = async (pokemon_id) => {
   const options = [0, 1];
   let endpoint = `https://pokeapi.co/api/v2/generation/${pokemon_id}/`
   let container = document.getElementById("container");
   container.innerHTML = "";
   let pokemons = await fetchPokemons(endpoint);
   let toggle = false;
     options.forEach(option => {
       pokemonsShow(option, pokemons,toggle);
     });

};

const pokemonsShow = (option, pokemons,toggle) => {
    pokemons.forEach(pokemon => {
        if (option === 0)
            pokemon.correctNum = orderNumber(pokemon.url);
        else {
            let pokemonItem = document.createElement("li");
            pokemonItem.classList.add("item");

            let pokemonImg = new Image();
            pokemonImg.src = "img/pokebola-icono.png";
            const toogleImgUrl = toggle ? "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" : "https://serebii.net/pokemongo/pokemon/";
            pokemonItem.innerHTML = `${orderNumber(pokemon.url)}-${pokemon.name}`;

        
            const urllmage = `${toogleImgUrl}${formatPokemonId(orderNumber(pokemon.url))}.png`;
            pokemonImg.setAttribute("data-image", urllmage);
            pokemonImg.setAttribute("class", "pokeimage");
            pokemonImg.setAttribute("alt", pokemon.name);


            pokemonItem.appendChild(pokemonImg);
            container.appendChild(pokemonItem);
            imgObserver.observe(pokemonImg);
        }
    });
    pokemons.sort((a, b) => a.correctNum - b.correctNum);
}
