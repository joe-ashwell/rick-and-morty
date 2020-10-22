const endpoint = 'https://rickandmortyapi.com/api/character/'

const characters = [];

let characterEndpoint;

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => {

      let characterCount = data.info.count;

        for (let c = 1; c < characterCount; c++) {
          fetch(`${endpoint}${c}`)
            .then(blob2 => blob2.json())
            .then(character => characters.push(character));
        }
    });
