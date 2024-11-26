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

    function addListItem(pokemon) {

    let pokemonList = document.querySelector(".pokemon-list") 
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");

    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");
    //button.classList.add("li_button");
    button.classList = 'btn btn-secondary btn-lg btn-block';
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
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
      pokemon.types = details.types.map((type) => type.type.name);

    }).catch(function (e) {
      console.error(e);
    });
  }

//Bootstrap modal
  function showModal(pokemon) {
    
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    //clear existing modal content
    modalHeader.empty();
    modalTitle.empty();
    modalBody.empty();

    //creating element for name/img/weight/etc in modal content
    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    let heightElement = $("<p>" + "Height: " + pokemon.height + " ft" + "</p>");
    let weightElement = $("<p>" + "Weight: " + pokemon.weight + " lbs" + "</p>");
    let typesElement = $("<p>" + "Type(s): " + pokemon.types.join(', ') + "</p>");
    //let imgElement = $('<img class="modal-img" style="width:50%>');
    let imgElement = document.createElement("img");
    imgElement.setAttribute("src", pokemon.imageUrl);

    imgElement.setAttribute("alt", "Pokemon image");
    imgElement.setAttribute("height", "150px");
    imgElement.classList.add('rounded');

    // appending elements to modal structure
    modalHeader.append(modalTitle);
    modalTitle.append(nameElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(imgElement);

    $("#exampleModal").modal("handleUpdate")
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon)
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
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