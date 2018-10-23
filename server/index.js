const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const connectionUrl = 'mongodb://localhost:27017/';
const dbName = 'stocks-board';
const collectionName = 'users';

app.use(bodyParser.json());

app.use('/', express.static('client/build'));

app.post('/api/register', (req, res) => {
    MongoClient.connect(connectionUrl, (err, client) => {
        client.db(dbName).collection(collectionName).findOne({
            username: req.body.username
        }, (err, user) => {
            if (user !== null) {
                res.send({success: false, error: 'username has already reserved'});
                client.close();
                return;
            }

            MongoClient.connect(connectionUrl, (err, client) => {
                client.db(dbName).collection(collectionName).insertOne({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    isAdmin: false
                }, (err, result) => {
                    if (err) {
                        res.send(err);
                        client.close();
                    }
                    res.send({success: true, user: result.ops[0]});
                    client.close();
               });
            });

        });
    });
});

app.post('/api/login', (req, res) => {
    MongoClient.connect(connectionUrl, (err, client) => {
        client.db(dbName).collection(collectionName).findOne({
            username: req.body.username,
            password: req.body.password
        }, (err, user) => {
            if (user === null) {
                res.send({success: false, error: 'incorrect username or password'});
                client.close();
                return;
            } else {
                res.send({success: true, user: user});
                client.close();
            }
        });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../client/build/index.html'));
});

const port = 8080;

app.listen(port, () => {
    console.log(`listen on ${port}`);
});
