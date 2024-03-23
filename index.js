const express = require('express');
const axios = require('axios');
const DB = require('./db.js');


const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(express.static('public'));

const apiRouter = express.Router();
app.use(`/api`, apiRouter);


// getLogin
apiRouter.post('/login', async (req, res) => {
  var e = await DB.tryLogin(req.body.username, req.body.password);
  res.status(200).json(e);
});
apiRouter.post('/regi', async (req, res) => {
  var a = await DB.doIExist(req.body.username);
  if(a){  
    res.status(300).json({a:"exists"});
  }
  var e = await DB.addLogin(req.body.username, req.body.password);
  res.status(200).json(e);
});



apiRouter.get('/lobbies', (_req, res) =>{
  res.send(lobbies);
});


apiRouter.post('/lobbyU', (req, res) => {
  updateLobbies(req.body);
  res.send(lobbies);
});

apiRouter.delete('/lobbyU', (req, res) => {
  deleteLobbies(req.body);
  res.send(lobbies);
})

app.use((_req, res) => {
  res.sendFile('index.html', {root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let lobbies = [];

function updateLobbies(newLobby) {
  let lIndex = lobbies.findIndex(lobby => lobby.id === newLobby.id);
  
  if (lIndex !== -1) {
    lobbies[lIndex] = newLobby;
  } else {
    lobbies.push(newLobby);
  }
}
function deleteLobbies(newLobby) {
  let lIndex = lobbies.findIndex(lobby => lobby.id === newLobby.id);
  
  if (lIndex !== -1) {
    lobbies.splice(lIndex, 1);
  } else {
  }
}

apiRouter.get('/yelp', async (req, res) => {
  try {
      const { term, latitude, longitude, radius, limit, sort_by } = req.query;
      
      // Make a request to the Yelp API
      const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
          params: { term, latitude, longitude, radius, limit, sort_by },
          headers: { Authorization: 'Bearer 7mD6M8l0Br53SZ8BOicND-KzyP37cKtxkh4ULprjnI5GtSn7Ng_C_hjD9Rrpyvq73JqoliXUEugYLhNncq0bUHea8AX1XvBUCW9F7b0Al-z8WnKwTDU5wEgp-n7vZXYx' } // Replace with your Yelp API key
      });

      // Send Yelp API response back to the client
      res.json(response.data);
  } catch (error) {
      // Handle errors
      console.error('Error fetching Yelp data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

