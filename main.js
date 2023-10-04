

const getPokemonFromApi = (endpoint) => {
    return fetch(`https://pokeapi.co/api/v2/${endpoint}`)
    .then(something => something.json())
    .then(({results}) => results)
    .then(results => results.map((pokemon)=> {
        const {name, url} = pokemon;
        return {name, url}
    }))
    
    
}

const getPokemonUrlFromApi = (url) =>{
    return fetch(`${url}`)
    .then(something => something.json())
    .then(({abilities}) => abilities)
    
    
     
    
}



const createCard = ({name, url}) => `
            <div class="row container m-1" ">
                <div class="col-sm-6 mb-3 mb-sm-0 container">
                    <div class="card">
                    <div class="card-body" poke-url="${url}">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">${url}</p>
                        <a href="#" class="btn btn-primary">Mas info</a>
                    </div>
                    </div>
                </div>
                
            </div>
`
const pageContent = document.getElementById("content");


//Aca le pasamos lo que se va a ver en la modal!!
const renderModal = (pokemonAbilities) =>{
    
    const primerHabilidad = pokemonAbilities[0].ability.name;
    const segundaHabilidad = pokemonAbilities[1].ability.name;
    
    console.log(primerHabilidad)
    const skill_1 = modal.querySelector(".modal-card-body-skill1");
    const skill_2 = modal.querySelector(".modal-card-body-skill2");
     
    skill_1.innerHTML= primerHabilidad;
    skill_2.innerHTML= segundaHabilidad;

    
}






const renderPage = async () => {
    const firstHundredPokemons = await getPokemonFromApi("pokemon?limit=100&offset=0")
    const template = firstHundredPokemons
    .map(pokemon => createCard(pokemon))
    .join("")
    pageContent.innerHTML = template
}


const modal = document.querySelector(".modal");

modal.querySelector(".delete").addEventListener("click", ()=>{
    modal.classList.remove("is-active")
});

const render = async () => {
    await renderPage();

    const cards = document.querySelectorAll(".card-body")
    
    cards.forEach(card =>{
        card.addEventListener("click", async (event) =>{
            const pokeUrl = event.currentTarget.getAttribute("poke-url")
            const pokemonAbilities = await getPokemonUrlFromApi(pokeUrl)
            console.log(pokemonAbilities)
            modal.classList.add("is-active")
            renderModal(pokemonAbilities);
        })
    })
    
}





render();