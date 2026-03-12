// ============ DOM SELECTORS ========== //
const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const menuButton = document.getElementById("menu-icon");
const sortSelect = document.getElementById("sort-select");
const filtersButton = document.getElementById("filter-icon");
const pokemonGrid = document.getElementById("pokemons-images");

let allPokemons = [];

async function loadPokemonList() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=1500",
  );
  const data = await response.json();

  allPokemons = data.results; // lista com nome e url
}

loadPokemonList();

// ============= RETRIEVING AND VALIDATING VALUE FROM SEARCH BAR =========== //

searchBar.addEventListener("input", () => {
  const input = searchBar.value.toLowerCase().trim();

  if(input === "") return;

  const filtered = allPokemons.filter(pokemon =>
    pokemon.name.includes(input)
  );

  showSuggestions(filtered.slice(0,10));
});

//

const suggestions = document.getElementById("suggestions");

function showSuggestions(list){
  suggestions.innerHTML = "";

  list.forEach(pokemon => {
    const item = document.createElement("div");
    item.textContent = pokemon.name;

    item.addEventListener("click", () => {
      searchBar.value = pokemon.name;
      suggestions.innerHTML = "";
      fetchData(pokemon.name);
    });

    suggestions.appendChild(item);
  });
}

// FETCHING DATA FROM API

async function fetchData(pokemonName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    if (!response.ok) {
      throw new Error("Pokemon não encontrado!");
    }

    displayInfo(await response.json());
  } catch (error) {
    // A error image will be displayed
  }
}

function displayInfo(data) {
    pokemonGrid.innerHTML = "";
  console.dir(data);
  const card = document.createElement("div");

  const pokemonImg = document.createElement("img");
  pokemonImg.src = data.sprites.front_default;
  card.appendChild(pokemonImg);

  const pokemonNameText = document.createElement("h2");
  pokemonNameText.textContent = data.name;
  card.appendChild(pokemonNameText);

  const pokemonIdText = document.createElement("p");
  pokemonIdText.textContent = `#${String(data.id).padStart(3, "0")}`;
  card.appendChild(pokemonIdText);

  const typesContainer = document.createElement("div");
  typesContainer.classList.add("pokemon-types");

  data.types.forEach((object) => {
    const typeText = document.createElement("span");
    typeText.textContent = object.type.name;
    typeText.classList.add(object.type.name);
    typesContainer.appendChild(typeText);
  });

  card.appendChild(typesContainer);

  pokemonGrid.appendChild(card);
}
