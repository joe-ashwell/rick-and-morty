const endpoint = 'https://rickandmortyapi.com/api/character/'

const characters = [];

let characterCount;

let characterEndpoint;

const getCharacterTotal = () => {

  fetch(endpoint)
    .then(blob => blob.json())
    .then(data => characterCount = data.info.count);

}

const getCharacterInfo = () => {

  // get url
  // push info into characters array

}

// Fetch is a browser API. Fetch returns a promise, which doesn't actually deliver anything right away, so you need to tell it what to do next once it has the data?
fetch(endpoint)
  // need to turn the raw data into JSON. This new blob.json returns yet another promise, so we need to use 'then' again.
  .then(blob => blob.json())
  // Then we can do something with the data returned.
  // In this case we take the JSON and put it into the characters array. To avoid nesting by just doing characters.push(data), we use 'spread' which is ES6 syntax and goes through each item, and puts it into the array. Kinda like forEach??
  .then(data => characterCount = data.info.count);
  // .then(data => characters.push(...data))

  for ( let c = 1; c < characterCount; c++ ) {
    // characterEndpoint = `${endpoint} + ${c}`;
    console.log('cunt');
  }
