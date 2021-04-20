const fetch = require('node-fetch');

async function apiRequest(url) {
  try {
    const req = await fetch(url);
    const response = await req.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

module.exports = apiRequest;
