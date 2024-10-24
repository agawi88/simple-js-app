var pokemonRepository = (function () {

let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';  

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      "name" in pokemon &&
      "detailsUrl" in pokemon )
      // "height" in pokemon &&
      // "types" in pokemon) {
    {
      pokemonList.push(pokemon);
    }
    else {
      console.log("Pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {

    let pokemonList = document.querySelector(".main_list") 
    let ListItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("li_button");
    ListItem.appendChild(button);
    pokemonList.appendChild(ListItem);
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

   function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

    function showDetails(item) {
    loadDetails(item).then(function () {
      console.log(item)
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };

})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});


Object.keys(pokemonRepository.getAll()).forEach(function(property) {
  console.log(property + ': ' + pokemonRepository.getAll()[property] + '<br>');
});

function filterPokemon(arr, query) {
  return arr.filter((el) => el.name.toLowerCase().includes(query.toLowerCase()));
  }
console.log(filterPokemon(pokemonRepository.getAll(), "pi"));
