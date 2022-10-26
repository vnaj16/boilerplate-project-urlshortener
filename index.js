require('dotenv').config();
const dns = require('dns'); //https://nodejs.org/api/dns.html
let bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = 3000;

let last_saved_id = 0;
let saved_short_urls = {
  0: "localhost:3000"
}

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

  dns.resolve(req.body.url, (err, address, family) => {
    if (err) {
      console.log(err)
    }
    console.log('address: %j family: IPv%s', address, family);

    saved_short_urls[last_saved_id+1] = req.body.url;
    last_saved_id++;
    res.json({ original_url : req.body.url, short_url : last_saved_id})
  });
});

app.get("/api/shorturl/status", function(req, res){
  res.json(saved_short_urls)
});

app.get("/api/shorturl/:short_url", function(req, res){
  console.log(req.params)
  console.log("Will be redirected to " + saved_short_urls[req.params.short_url])
  res.redirect(saved_short_urls[req.params.short_url])
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
