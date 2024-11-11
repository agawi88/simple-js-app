let pokemonRepository = (function () {

let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';  
  let modalContainer = document.querySelector('#modal-container');
  /*let item = document.querySelector(loadList.pokemon)*/


  function showModal(title, text, img) {
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

   let nameElement = document.createElement('h1');
    nameElement.innerText = title;

    let heightElement = document.createElement('p');
    heightElement.innerText = text; 
    
   /* let typesElement = document.createElement('p');
    typesElement.innerText = types;*/
    
    let imgContainer = document.querySelector('#image-container');
    let detailsUrl = document.createElement('img');
    /*detailsUrl.src = pokemon.detailsUrl;*/
    detailsUrl.setAttribute("src", img);
    detailsUrl.setAttribute("width", "104");
    detailsUrl.setAttribute("height", "104");
    detailsUrl.setAttribute("alt", "The pokemon image");

    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(heightElement); 
    /*modal.appendChild(typesElement);*/
    imgContainer.appendChild(detailsUrl);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("li_button");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
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
          height: item.height,
         /* types:item.types,*/
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
      item.name = details.name;
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
     /* item.types = details.types;*/
    }).catch(function (e) {
      console.error(e);
    });
  }

 function showDetails(item) { loadDetails(item).then(function (details) {
    showModal(item.name + "Height: " + item.height + item.imageUrl)
  });
  }

/*     function showDetails(item) {
    loadDetails(item).then(function () {
      console.log(item)
    }); 
  }*/

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

 /* Note:  added for practice reasons. Will be deleted later on.

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
    
    if (!value) {
      showErrorMessage(passwordInput, 'Password is a required field.');
      return false;
    }
    if (value.length < 8) {
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

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Success!');
    }
  });

  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', validatePassword);

})();

(function() {
  
  let modalContainer = document.querySelector('#modal-container');
  let dialogPromiseReject;

function showModal(title, text) {

  modalContainer.innerHTML = '';
  let modal = document.createElement('div');
  modal.classList.add('modal');
  
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);
  
  let titleElement = document.createElement('h1');
  titleElement.innerText = title;
  
  let contentElement = document.createElement('p');
  contentElement.innerText = text;
  
  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);
    
  modalContainer.classList.add('is-visible');
}
  
 function hideModal() {
  modalContainer.classList.remove('is-visible');
   
   if (dialogPromiseReject) {
     dialogPromiseReject();
     dialogPromiseReject = null;
   }
}
  
 function showDialog(title, text) {
   showModal(title, text);

  let modal = modalContainer.querySelector('.modal');
  
  let confirmButton = document.createElement('button');
  confirmButton.classList.add('modal-confirm');
  confirmButton.innerText = 'Confirm';
  
  let cancelButton = document.createElement('button');
 cancelButton.classList.add('modal-cancel');
  cancelButton.innerText = 'Cancel';
  
  modal.appendChild(confirmButton);
  modal.appendChild(cancelButton);
    
  confirmButton.focus();
  
  return new Promise((resolve, reject) => {
    cancelButton.addEventListener('click', hideModal);
    confirmButton.addEventListener('click', () => {
      dialogPromiseReject = null;      
      hideModal();
      resolve(); 
    });
   dialogPromiseReject = reject;       
  });
 }
   document.querySelector('#show-modal').addEventListener('click', () => {
      showModal('Modal title', 'This is the modal content!');
    });
  
  document.querySelector('#show-dialog').addEventListener('click', () => {
    showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
      alert('confirmed!');
    }, () => {
        alert ('not confirmed');
    });
  });
 
  window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();  
  }
});
 modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
}); 

})(); 
// Here for practice reasons, will be deleted after the assignment has been successful. */
