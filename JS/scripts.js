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

/* let text = "";
let i = 0;
for (;pokemonList[i].name;){
  text = text + " " + pokemonList[i].name + " ( " + pokemonList[i].height + ")";
  i++;
}
document.write(text); */


/* for (let i = 0; i < pokemonList.length; i++)
document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + "</p>");
{
if (pokemonList[i].height >= 1){
document.write(" Wow! You're big!");
}else { 
document.write("You are tiny!"); 
}
} */

for (let i = 0; i < pokemonList.length; i++) {
  if (i < pokemonList.length) {
    document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + " Wow! You're big!" + "</p>");
  } else {
    document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + "You are tiny!" + "</p>");
  }
} 