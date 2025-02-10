document.addEventListener("DOMContentLoaded",() => {
     let generations =["generation-1", "generation-2",
                       "generation-3", "generation-4",
                       "generation-5", "generation-6",
                       "generation-7"];

    let filters = document.getElementById("filters");
    let generation ="";

    generations.forEach((gen,index) => {
       generation += `<input class="radio-gens" type="radio" id="${index+1}"
                       name="generation" checked>
                       <label for="${index+1}" class:"label-gens">${gen}
                       </label>`;
    });

    filters.innerHTML = generation;
})