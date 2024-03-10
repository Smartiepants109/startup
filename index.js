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


apiRouter.post('/time', (req, res) => {
  lobbies = updateLobbies(req.body, lobbies);
  res.send(lobbies);
});

app.use((_req, res) => {
  res.sendFile('index.html', {root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let lobbies = []; // didn't think of how to manage closing a lobby. Going to make it so that only so
// many can be open at once. Making 20 the max.
function updateLobbies(newLobby, lobbies) {
  let found = false;
  for (const [i, prevtime] of lobbies.entries()) {
    if (newLobby.time > prevtime.time) {
      lobbies.splice(i, 0, newLobby);
      found = true;
      break;
    }
  }

  if (!found) {
    lobbies.push(newLobby);
  }

  if (lobbies.length > 20) {
    lobbies.length = 20;
  }

  return lobbies;
}