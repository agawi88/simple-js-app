let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';  
  
    function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      "name" in pokemon &&
      "detailsUrl" in pokemon )
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

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          height: item.height,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

   function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
    return response.json();
    }).then(function (details) {
      pokemon.name = details.name;
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.types = details.types;

      showModal(pokemon);
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon)
    });
  }

  function addListItem(pokemon) {

    let pokemonList = document.querySelector(".pokemon-list") 
    let listItem = document.createElement("li");
    listItem.classList.add(".list-group-item");

    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");
    button.classList.add('li_button');
    button.addEventListener('click', function (event) {
      showDetails(item);
    });

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
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