

const getPokemonFromApi = (endpoint) => {
    return fetch(`https://pokeapi.co/api/v2/${endpoint}`)
    .then(something => something.json())
    .then(({results}) => results)
    .then(results => results.map((pokemon)=> {
        const {name, url} = pokemon;
        return {name, url}
    }))
    
    
}



const createCard = ({name, url}) => `
            <div class="row container m-1">
                <div class="col-sm-6 mb-3 mb-sm-0 container">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">${url}</p>
                        <a href="#" class="btn btn-primary">Mas info</a>
                    </div>
                    </div>
                </div>
                
            </div>
`
const pageContent = document.getElementById("content");





const renderPage = async () => {
    const firstHundredPokemons = await getPokemonFromApi("pokemon?limit=100&offset=0")

    const template = firstHundredPokemons
    .map(pokemon => createCard(pokemon))
    .join("")
    pageContent.innerHTML = template
}

renderPage();