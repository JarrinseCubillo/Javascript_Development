import { fetchGenerations, createGenerationFilters } from './functions/fetchGenerations.js';
import {getPokemons} from './functions/fetchFormatPokemon.js';
document.addEventListener("DOMContentLoaded", () => {
  const loadGenerations = async () => {
    const generations = await fetchGenerations();
    createGenerationFilters(generations);
  };
  loadGenerations(); 
  getPokemons(1);
});

filters.addEventListener("click", (e) =>{
  if(e.target.type==="radio") {
    getPokemons(e.target.value);
    title.innerHTML ="Pokemon Gen " + e.target.value;
  }
})