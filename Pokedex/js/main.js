document.addEventListener("DOMContentLoaded", () => {

  const fetchGenerations = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/generation/");
      const data = await response.json();
      return data.results; 
    } catch (error) {
      console.error('Error fetching generations:', error);
    }
  };

  const createGenerationFilters = (generations) => {
    const filters = document.getElementById("filters");
    let generationHTML = '';

    generations.forEach((gen, index) => {
      generationHTML += `
        <input class="radio-gens" type="radio" id="${gen.name}" value="${index + 1}" name="generation" ${index===0 ? "checked":""}>
        <label for="${gen.name}" class="label-gens">${gen.name}</label>
      `;
    });

    filters.innerHTML = generationHTML;
  };

  const loadGenerations = async () => {
    const generations = await fetchGenerations();
    createGenerationFilters(generations);
  };

  loadGenerations();
  

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

  const getPokemons = async (pokemon_id) => {
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
                pokemonImg.src = "img/pokebola-icono.png"; // Imagen por defecto
                const toogleImgUrl = toggle ? "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" : "https://serebii.net/pokemongo/pokemon/";
                pokemonItem.innerHTML = `${orderNumber(pokemon.url)}-${pokemon.name}`;

                // Corregir la URL de la imagen
                const urllmage = `${toogleImgUrl}${formatPokemonId(orderNumber(pokemon.url))}.png`;
                pokemonImg.setAttribute("data-image", urllmage);
                pokemonImg.setAttribute("class", "pokeimage");
                pokemonImg.setAttribute("alt", pokemon.name);

                // Agregar la imagen al item
                pokemonItem.appendChild(pokemonImg);
                container.appendChild(pokemonItem);
                imgObserver.observe(pokemonImg);
            }
        });
        pokemons.sort((a, b) => a.correctNum - b.correctNum);
    }

  getPokemons(1);

  const orderNumber = (str) => {
      let mySubString = str.substring(
          str.lastIndexOf("s/") + 2, str.lastIndexOf("/")
      )
      return mySubString;
  }

  const formatPokemonId = (pokemonId) => {
      if (pokemonId < 10)
          pokemonId = "00" + pokemonId;
      else if (pokemonId < 100)
          pokemonId = "0" + pokemonId;

      return pokemonId;
  }

  
  filters.addEventListener("click", (e) =>{
    if(e.target.type==="radio") {
      getPokemons(e.target.value);
      title.innerHTML ="Pokemon Gen " + e.target.value;
    }
  })
});