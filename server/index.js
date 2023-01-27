// server/index.js
require('dotenv').config();
const express = require('express');
const request = require('request');
const path = require('path');

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get('/getToken', function(req, res) {
  const postQuery = 'grant_type=client_credentials';
  request({
      url: "https://accounts.spotify.com/api/token",
      method: "POST",
      headers: {
          'Authorization':`Basic ${Buffer.from(clientId + ':' + clientSecret).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postQuery.length
      },
      body: postQuery
  }, function(error, response, data) {
      res.end(data);
  })
});

app.use(express.static(path.resolve(__dirname, '../linkle-client/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../linkle-client/build', 'index.html'));
});