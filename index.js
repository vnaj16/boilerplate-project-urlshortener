require('dotenv').config();
let bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}))

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post("/api/shorturl", function(req, res){
  console.log(req.body)
  res.json({ original_url : req.body.url, short_url : 1})
});

app.get("/api/shorturl/:short_url", function(req, res){
  console.log(req.params)
  res.json({ redirect_to : req.params.short_url})
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
