

const getPokemonFromApi = () => {
    return fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`)
    .then(something => something.json())
    .then(({results}) => results)
    .then(results => results.map((pokemon)=> {
        const {name, url} = pokemon;
        return {name, url}
    }))
    
    
}

getPokemonFromApi()
    .then((pokemon) => console.log(pokemon))