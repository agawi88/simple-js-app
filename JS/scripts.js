var pokemonRepository = (function () {

let pokemonList = [
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
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    }
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Pikachu' });
console.log(pokemonRepository.getAll()); 

  function myLoopFunction(pokemon) {
  
   if (pokemon.height >= 1) {
    document.write("<p><b>" + pokemon.name + " (height: " + pokemon.height + ")" + " Wow! You're big!" + "</b></p>");
  } 
  else {
    document.write("<p>" + pokemon.name + " (height: " + pokemon.height + ")" + "You are tiny!" + "</p>");
        }
}
pokemonRepository.getAll().forEach(myLoopFunction);

Object.keys(pokemonRepository.getAll()).forEach(function(property) {
  document.write(property + ': ' + pokemonRepository.getAll()[property] + '<br>');
});

function filterPokemon(arr, query) {
  return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
}
console.log(filterPokemon(pokemonRepository.getAll(), "pi"));
