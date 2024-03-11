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
}function deleteLobbies(newLobby) {
  let lIndex = lobbies.findIndex(lobby => lobby.id === newLobby.id);
  
  if (lIndex !== -1) {
    lobbies.splice(lIndex, 1);
  } else {
    //do nothing because it isn't here.
  }
}