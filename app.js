const endpoint = 'https://rickandmortyapi.com/api/character/'

const words = [];

// fetch returns a promise, which is..?
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => console.log(data));
