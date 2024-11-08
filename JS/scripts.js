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

(function() {
  let form = document.querySelector('#register-form');
  let emailInput = document.querySelector('#email');
  let passwordInput = document.querySelector('#password');
  
  function showErrorMessage (input, message) {
    let container = input.parentElement;
    let error = container.querySelector('.error-message');
    if (error) {
      container.removeChild(error);
    }
    if (message){
      let error = document.createElement('div');
      error.classList.add('error-message');
      error.innerText = message;
      container.appendChild(error);
}
}
  
  function validateEmail() {
    let value = emailInput.value;
        /* the underneath should stay in the same place as in the beginning of coding the email validation?
    let hasAtSign = value.indexOf('@') > -1;
    let hasDot = value.indexOf('.') > -1;
    return value && hasAtSign && hasDot;*/
    
    if (!value) {
      showErrorMessage(emailInput, 'Email is a required field.');
      return false;
    }
    if (value.indexOf('@') === -1) {
      showErrorMessage(emailInput, 'You must eneter a valid email address.');
      return false;
    }
    if (value.indexOf('.') === -1) {
      showErrorMessage(emailInput, 'You must eneter a valid email address.');
      return false;
    }
    showErrorMessage(emailInput, null);
    return true;
  }
  
  function validatePassword() {
    let value = passwordInput.value;
    // return value && value.length >= 8;
    
    if (!value) {
      showErrorMessage(passwordInput, 'Password is a required field.');
      return false;
    }
    if (value.langth < 8) {
      showErrorMessage(passwordInput, 'The password needs to be at least 8 characters long.');
      return false;
    }
    showErrorMessage(passwordInput, null);
    return true;
  }
  
  function validateForm() {
    let isValidEmail = validateEmail();
    let isValidPassword = validatePassword();
    return isValidEmail && isValidPassword;
  }
  
  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', validatePassword);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Success!');
    }
  })

})();
