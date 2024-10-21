var pokemonRepository = (function () {

let repository = [
{
name: "Pikachu",
height: 0.4,
types: ["mouse", "electricShock", "lightningrod", "static"],
},
{
name: "Persian",
height: 1,
types: ["siameseCat", "haughty", "jewel", "limber"],
},
{
name: "Vulpix",
height: 0.6,
types: ["fox", "tails", "flashFire", "draught"],
},
];

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon) {
      repository.push(pokemon);
    }
    else {
      console.log("Pokemon is not correct");
    }
  }

  function getAll() {
    return repository;
  }

  function addListItem(pokemon) {

    let pokemonList = document.querySelector(".main_list") 
    let ListItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("li_button");
    ListItem.appendChild(button);
    pokemonList.appendChild(ListItem);
    button.addEventListener('click', function showDetails(pokemon) {
      console.log(add(pokemon))
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon)
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };

})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Vulpix', height: 0.6, types: "fire" });
console.log(pokemonRepository.getAll()); 

pokemonRepository.getAll().forEach(function (pokemon) {
  console.log(pokemon);
  pokemonRepository.addListItem(pokemon);
});

Object.keys(pokemonRepository.getAll()).forEach(function(property) {
  console.log(property + ': ' + pokemonRepository.getAll()[property] + '<br>');
});

function filterPokemon(arr, query) {
  return arr.filter((el) => el.pokemon.toLowerCase().includes(query.toLowerCase()));
  }
console.log(filterPokemon(pokemonRepository.getAll(), "pi"));
