const express = require('express');
const redis = require('redis');
var path = require('path')
const bodyParser = require('body-parser');

const db_url = "mongodb://mongo-container:27017/myproject";
var MongoClient = require("mongodb").MongoClient;
var redisClient;


const PORT = 8089;

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended:true}));

 //() => {
  const f = async () => {
    console.log(`hello`);
      
    redisClient =  redis.createClient({
      url: 'redis://myredis:6379'
    });
    await redisClient.connect()
    redisClient.on('error', (err) => {
      console.log('Error occured while connecting or accessing redis server');
    });
  }

  f()

//}
/**/


//insert a movies in the database
app.post('/saveMovie', async (req, res) => {
  const client = await MongoClient.connect(db_url);
  console.log("Connecté à la base de données 'MyDB'");
  const db = client.db('MyDB');
  await db.collection('Movies').insertOne(req.body);
  res.send('Movie saved');
  client.close();

  
  const data = req.body;
  await redisClient.LPUSH("recentMovies", JSON.stringify(data), redis.print);
  //redisClient.expire('tvshow', 10);
});



app.post('/content', (req, res) => {
  res.sendFile('public/movies.html', {root:__dirname});
});

app.listen(PORT, () => {
  console.log(`Running on http://${PORT}`);
});