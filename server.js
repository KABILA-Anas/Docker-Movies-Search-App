const express = require('express');
var path = require('path')
const db_url = "mongodb+srv://0x4ns:Powerpoint7*@firstcluster.ic0a2vm.mongodb.net/MyDB?retryWrites=true&w=majority";
var MongoClient = require("mongodb").MongoClient;

const PORT = 8089;

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended:true}));

/*app.post('/saveMovie', (req, res) => {
  // Extract the data from the request body
  console.log(req.body);
  MongoClient.connect(db_url, (err, client) => {
    //if (error) return funcCallback(error);

    console.log("Connecté à la base de données 'MyDB'");
    const db = client.db('MyDB');
    db.collection('Movies').insertOne(req.body);
    //client.close();
});
});*/

app.post('/saveMovie', async (req, res) => {
  const client = await MongoClient.connect(db_url);
  console.log("Connecté à la base de données 'MyDB'");
  const db = client.db('MyDB');
  await db.collection('Movies').insertOne(req.body);
  res.send('Movie saved');
  client.close();
});



app.post('/content', (req, res) => {
  res.sendFile('public/movies.html', {root:__dirname});
});

app.listen(PORT, () => {
  console.log(`Running on http://${PORT}`);
});