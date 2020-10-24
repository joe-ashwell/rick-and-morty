const endpoint = 'https://rickandmortyapi.com/api/character/'

const characters = [];

const searchInput = document.querySelector('input.search');
const suggestions = document.querySelector('ul.suggestions');

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
      <span class="character-name">${characterName}, ${characterSpecies}</span>
      <span class="character-status">${character.status}</span>
    </li>
    `
  }).join('');

  // displays the html variable to the page
  suggestions.innerHTML = html;

}

// Event listener to listen to the key presses of the user in the search bar
searchInput.addEventListener('keyup', displayMatches);