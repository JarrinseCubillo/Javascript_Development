export const orderNumber = (str) => {
    let mySubString = str.substring(
        str.lastIndexOf("s/") + 2, str.lastIndexOf("/")
    )
    return mySubString;
}

export const formatPokemonId = (pokemonId) => {
    if (pokemonId < 10)
        pokemonId = "00" + pokemonId;
    else if (pokemonId < 100)
        pokemonId = "0" + pokemonId;

    return pokemonId;
}