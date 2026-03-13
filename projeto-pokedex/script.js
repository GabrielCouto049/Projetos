// ============ DOM SELECTORS ========== //
const searchBar = document.getElementById("search-bar");
const sortSelect = document.getElementById("sort-select");
const pokemonGrid = document.getElementById("pokemons-images");
const suggestions = document.getElementById("suggestions");
const filterButton = document.getElementById('filter-icon')
const filterScreen = document.getElementById('filters');
const menuButton = document.getElementById('menu-icon');
const menu = document.getElementsByTagName('nav')[0]

// =========== MENU TOGGLE ======================//

menuButton.addEventListener('click', (e) => {
  menu.classList.toggle('show');
})

//=========== FILTER INTERFACE TOGGLE ========= //

filterButton.addEventListener('click', (e) => {
  filterScreen.classList.toggle('show');
})

let allPokemons = [];

// ============ LOAD POKEMON LIST ========== //
async function loadPokemonList() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1500");
    const data = await response.json();

    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const details = await res.json();

        return {
          name: details.name,
          id: details.id,
          types: details.types.map((t) => t.type.name),
          image: details.sprites.front_default
        };
      })
    );

    allPokemons = pokemonDetails;
    loadPokemonGrid();

  } catch (error) {
    console.error("Erro ao carregar Pokemons", error);
  }
}

loadPokemonList();


// ============= SEARCH =========== //
searchBar.addEventListener("input", () => {

  const input = searchBar.value.toLowerCase().trim();

  if (input === "") {
    suggestions.style.display = "none";
    loadPokemonGrid();
    return;
  }

  const filtered = allPokemons.filter(pokemon =>
    pokemon.name.includes(input)
  );

  showSuggestions(filtered.slice(0,4));
});

// ============= SORT =========== //
sortSelect.addEventListener("change", loadPokemonGrid);


// ============= SUGGESTIONS =========== //
function showSuggestions(list){

  suggestions.innerHTML = "";
  suggestions.style.display = "flex";

  if(list.length === 0){
    suggestions.innerHTML = `<p style="color:red;margin:.5rem;">Nenhum pokemon encontrado</p>`;
    return;
  }

  list.forEach(pokemon => {

    const item = document.createElement("div");
    item.textContent = pokemon.name;

    item.addEventListener("click", () => {
      searchBar.value = pokemon.name;
      suggestions.style.display = "none";
      displayPokemon([pokemon]);
    });

    suggestions.appendChild(item);
  });

}

// ============= GRID =========== //
function loadPokemonGrid(){

  let pokemons = [...allPokemons];

  if(sortSelect.value === "sortByNumber"){
    pokemons.sort((a,b)=>a.id-b.id);
  }

  if(sortSelect.value === "sortByName"){
    pokemons.sort((a,b)=>a.name.localeCompare(b.name));
  }

  if(sortSelect.value === "sortByType"){
    pokemons.sort((a,b)=>a.types[0].localeCompare(b.types[0]));
  }

  displayPokemon(pokemons.slice(0,20));
}

// ============= DISPLAY =========== //
function displayPokemon(list){

  pokemonGrid.innerHTML = "";

  list.forEach(pokemon => {

    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    const img = document.createElement("img");
    img.src = pokemon.image;

    const name = document.createElement("h2");
    name.textContent = pokemon.name;

    const id = document.createElement("p");
    id.textContent = `#${String(pokemon.id).padStart(3,"0")}`;

    const typesContainer = document.createElement("div");
    typesContainer.classList.add("pokemon-types");

    pokemon.types.forEach(type => {

      const span = document.createElement("span");
      span.textContent = type;
      span.classList.add(type);

      typesContainer.appendChild(span);
    });

    card.append(img,name,id,typesContainer);
    pokemonGrid.appendChild(card);
  });
}

