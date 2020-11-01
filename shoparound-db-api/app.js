const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());

app.get('/', function(req, res) {
    res.send({ans: "NICE"});
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));