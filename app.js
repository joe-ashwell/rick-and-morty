const endpoint = 'https://rickandmortyapi.com/api/character/'

const characters = [];

const searchInput = document.querySelector('input.search');
const resultsReturned = document.querySelector('ul.results-returned');
const countResults = document.querySelector('p.count-results');
const closeModal = document.querySelector('p.modal-close');
const displayCharacterDiv = document.querySelector('div.modal-display-character');
const innerDisplayCharacterDiv = document.querySelector('div.inner-modal-display-character');
const mainSection = document.querySelector('main');

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => {

      let pagesCount = data.info.pages;

        for (let c = 1; c <= pagesCount; c++) {
          fetch(`${endpoint}?page=${c}`)
            .then(blob => blob.json())
            .then(page => characters.push(...page.results));
        }
    });

// function to find matches between user search and characters array. Passing in the 'wordToMatch' which is what the user searches, and the character array to the function, so it knows what to search against.
function findMatches(wordToMatch, characters) {
  
  // Return the filtered characters array
  return characters.filter(character => {

    // passes the 'wordToMatch' to the regular expression
    // Flags; g = global, i = insensitive
    const regex = new RegExp(wordToMatch, 'gi');
    // returns a match against the regex and characters name or species
    return character.name.match(regex) || character.species.match(regex);

  });

}

// function to display the matches
function displayMatches() {

  // Invokes the findmatches function passing the value from the user and the characters array
  const matchValues = findMatches(this.value, characters);

    const html = matchValues.map(character => {

      const regex = new RegExp(this.value, 'gi');
      const characterName = character.name.replace(regex, `<span class="highlight">${this.value}</span>`);
      const characterSpecies = character.species.replace(regex, `<span class="highlight">${this.value}</span>`);
      
      return `
      <li class="result">
        <span class="group-items-left">
          <img class="list-image" src="${character.image}">
          <span class="character-name">${characterName}, ${characterSpecies}</span>
        </span>
        <span class="character-status">${character.status}</span>
      </li>
      `
    }).join('');

  // displays the html variable to the page
  if (matchValues.length > 0) {
    resultsReturned.innerHTML = html;
  } else {
    resultsReturned.innerHTML = `<li class="result no-result"><img class="list-image" src="https://rickandmortyapi.com/api/character/avatar/66.jpeg"><span class="character-name">No such character, idiot!</span></li>`
  }

  countMatches();
  callOutCharacter();
}

// Function to count the matches
function countMatches() {

  const listElements = document.querySelectorAll('li.result');

  if (listElements[0].textContent === "No such character, idiot!") {
    countResults.innerHTML = `No results found`;
  } else {
    countResults.innerHTML = `${listElements.length} results from ${characters.length} characters`;
  }

}

function callOutCharacter() {
  const listItems = document.querySelectorAll('li.result');

  listItems.forEach(item => {
    item.addEventListener("click", () => {
      let name = item.textContent.split(",");
      console.log(name);
      name[0] = name[0].replace(/(^\s+|\s+$)/g,'');
      console.log(name[0]);

      if (name[0] !== "No such character") {

        displayCharacterDiv.style.display = "block"

        // I did get caught out on undefined elements as I hadn't considered case discrepencies.
        const character = characters.find(cast => cast.name.toLowerCase() === name[0].toLowerCase());
        console.log(character);
        innerDisplayCharacterDiv.innerHTML = `
  
        <div>
          <img class="character-image-modal" src="${character.image}">
        </div>
  
        <div>
          <p class="character-info-modal">Name: ${character.name}</p>
          <p class="character-info-modal">Episodes: ${character.episode.length}</p>
          <p class="character-info-modal">Gender: ${character.gender}</p>
          <p class="character-info-modal">Current location: ${character.location.name}</p>
          <p class="character-info-modal">Birth place: ${character.origin.name}</p>
          <p class="character-info-modal">Species: ${character.species}</h2>
          <p class="character-info-modal">Status: ${character.status}</p>
        </div>
        
        `
      }

    })
  })

}

// Event listener to listen to the key presses of the user in the search bar
searchInput.addEventListener('keyup', displayMatches);

closeModal.addEventListener('click', () => {
  displayCharacterDiv.style.display = "none"
});