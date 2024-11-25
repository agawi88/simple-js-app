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

   function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
    return response.json();
    }).then(function (json) {
      item.name = json.name;
      item.imageUrl = json.sprites.front_default;
      item.height = json.height;
      item.weight = json.weight;
      item.types = json.types;

      showModal(pokemon);
      return (pokemon);
    }).catch(function (e) {
      console.error(e);
    });
  }

  function addListItem(pokemon) {

    let pokemonList = document.querySelector(".pokemon-list") 
    let listItem = document.createElement("li");
    listItem.classList.add('list-group-item');

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
  
  function showDetails(pokemon) {
            loadDetails(pokemon)
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

  //show modal
  function showModal(item) {
    
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    //clear existing modal content
    modalHeader.empty();
    modalTitle.empty();
    modalBody.empty();

    //creating element for name/img/weight/etc in modal content
    let nameElement = $("<h1>" + item.name + "</h1>");
    let heightElement = $("<p>" + "Height: " + item.height + " ft" + "</p>");
    let weightElement = $("<p>" + "Weight: " + item.weight + " lbs" + "</p>");
    let typesElement = $("<p>" + "Type: " + item.types + "</p>");
    let imgElement = $('<img class="modal-img" style="width:50%>');
    imgElement.attr("src", item.imgUrl);

    // appending elements to modal structure
    modalTitle.append(nameElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(imgElement);

  }

Object.keys(pokemonRepository.getAll()).forEach(function(property) {
  console.log(property + ': ' + pokemonRepository.getAll()[property] + '<br>');
});

function filterPokemon(arr, query) {
  return arr.filter((el) => el.name.toLowerCase().includes(query.toLowerCase()));
  }
console.log(filterPokemon(pokemonRepository.getAll(), "pi"));