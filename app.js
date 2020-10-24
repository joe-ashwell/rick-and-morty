const endpoint = 'https://rickandmortyapi.com/api/character/'

const characters = [];

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