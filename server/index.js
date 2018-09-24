const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/', express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'client/build/index.html'));
});

const port = 8080;

app.listen(port, () => {
    console.log(`listen on ${port}`);
});
