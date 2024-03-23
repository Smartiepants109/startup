const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const cred = db.collection('cred');


// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function addLogin(username1, password1) {
  const result = await cred.insertOne({
    username: username1,
    password: password1
  });
  return result;
}

function tryLogin(username1, password) {
  const query = { username: username1 };
  const options = {
    limit: 1
  };
  const cursor = cred.find(query, options);
  if(cursor.toArray.length == 0){
    addLogin(username1, password);
    return true;
  }
  const item = cursor.toArray()[0];
  return item.password == password;
}

module.exports = { addLogin, tryLogin };
