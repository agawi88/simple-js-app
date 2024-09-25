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

/* for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height >= 1) {
    document.write("<p><b>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + " Wow! You're big!" + "</b></p>");
  } 
  else {
    document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + "You are tiny!" + "</p>");
  }
}  */

(function () {
  function myLoopFunction(pokemon) {
  
   if (pokemon.height >= 1) {
    document.write("<p><b>" + pokemon.name + " (height: " + pokemon.height + ")" + " Wow! You're big!" + "</b></p>");
  } 
  else {
    document.write("<p>" + pokemon.name + " (height: " + pokemon.height + ")" + "You are tiny!" + "</p>");
        }
}
pokemonList.forEach(myLoopFunction);
})();