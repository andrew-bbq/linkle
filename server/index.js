// server/index.js
require('dotenv').config();
const Constants = require("./util/Constants")
const axios = require('axios');
const express = require('express');
const path = require('path');
const qs = require('qs')

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

async function getSpotifyTokenPromise() {
  const data = qs.stringify({'grant_type':'client_credentials'});
  const response = await axios.post(Constants.SPOTIFY_AUTH_URL, data, {
    headers: {
      'Authorization':`Basic ${Buffer.from(clientId + ':' + clientSecret).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  return response.data.access_token
}

app.get('/getTrack', async function(req, res) {
  async function getSpotifyTrackPromise(token, id) {
      const tokenVal = await token
      console.log(tokenVal)
      const response = axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
          headers: { 'Authorization' : `Bearer ${tokenVal}`}
      })
      return response
  }

  const id = req.query.id
  const token = getSpotifyTokenPromise();
  const track = getSpotifyTrackPromise(token, id)
});

app.get('/getAlbum', async function(req, res) {
  async function getSpotifyAlbumPromise(token, id) {
      const tokenVal = await token
      console.log(tokenVal)
      const response = axios.get(`https://api.spotify.com/v1/albums/${id}`, {
          headers: { 'Authorization' : `Bearer ${tokenVal}`}
      })
      return response
  }
});

app.use(express.static(path.resolve(__dirname, '../linkle-client/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../linkle-client/build', 'index.html'));
});