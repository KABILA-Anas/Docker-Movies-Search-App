const express = require('express');
var path = require('path')

const PORT = 8089;

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.post('/content', (req, res) => {
  res.sendFile('public/movies.html', {root:__dirname});
});

app.listen(PORT, () => {
  console.log(`Running on http://${PORT}`);
});