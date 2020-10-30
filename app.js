const endpoint = 'https://rickandmortyapi.com/api/character/'

const characters = [];

const searchInput = document.querySelector('input.search');
const resultsReturned = document.querySelector('ul.results-returned');
const countResults = document.querySelector('p.count-results');
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
          <img class="list-image" src="${character.image}">
        <span class="list-item-right">
          <span class="character-name">
            <p>${characterName}</p>
          </span>
          <span class="character-status">
            <p class="character-status-p ">${character.status} - ${characterSpecies}</p>
          </span>
          <span class="character-location-span">
            <p>Last known location:</p>
            <span class="character-location">${character.location.name}</span>
          </span>
          <span class="episode-number-span">
            <p>Popularity:</p>
            <span class="episode-number">${character.episode.length} episode(s)</span>
          </span>
        </span>
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
  areTheyDead();

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

// Function to check if character is dead or not
function areTheyDead() {

  const characterStatuses = document.querySelectorAll('p.character-status-p');

  characterStatuses.forEach(character => {
    
      if (character.textContent.toLowerCase().includes("dead")) {
        character.classList.add("dead");
      } else if (character.textContent.toLowerCase().includes("alive")) {
        character.classList.add("alive");
      } else if (character.textContent.toLowerCase().includes("unknown")) {
        character.classList.add("unknown");
      }

  })

}



// Event listener to listen to the key presses of the user in the search bar
searchInput.addEventListener('keyup', displayMatches);