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



for (let i=0; i < pokemonList.length; i++) {
if (pokemonList[i].height >= 1){
console.log(pokemonList[i].name + ", wow! You're big!");
}else { 
console.log(pokemonList[i].name + " you are tiny!"); 
}
}