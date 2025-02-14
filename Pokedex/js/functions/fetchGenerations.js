export const fetchGenerations = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/generation/");
      const data = await response.json();
      return data.results; 
    } catch (error) {
      console.error('Error fetching generations:', error);
    }
  };

  export const createGenerationFilters = (generations) => {
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