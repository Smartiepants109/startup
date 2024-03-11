const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(express.static('public'));

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/lobbies', (_req, res) =>{
  res.send(lobbies);
});


apiRouter.post('/lobbyU', (req, res) => {
  updateLobbies(req.body);
  res.send(lobbies);
});

app.use((_req, res) => {
  res.sendFile('index.html', {root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let lobbies = [];

function updateLobbies(newLobby) {
  let lIndex = lobbies.findIndex(lobby => lobby.id === newLobby.id);
  
  if (lobbyIndex !== -1) {
    lobbies[lobbyIndex] = newLobby;
  } else {
    lobbies.push(newLobby);
  }
}