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
  var result = await cred.insertOne({
    username: username1,
    password: password1
  });
  return result;
}

async function tryLogin(username1, password) {
  var query = { username: username1 };
  var cursor = await cred.findOne(query);

  if(!cursor){
    addLogin(username1, password);
    return {a: true};
  }
  if(cursor.password === password){
    return {a:true};
  }
  return {a:false};
}

module.exports = { addLogin, tryLogin };
