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

console.log(characters);

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

function displayMatches() {

  const matchValues = findMatches(this.value, characters);
  console.log(matchValues);

}

searchInput.addEventListener('keyup', displayMatches);