const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('./config');

const connectionUrl = 'mongodb://localhost:27017/';
const dbName = 'stocks-board';
const collectionName = 'users';
const pathToHtml = '/../client/build/index.html';

app.use(bodyParser.json());

app.use('/', express.static('client/build'));

app.post('/api/register', (req, res) => {
    MongoClient.connect(connectionUrl, (err, client) => {
        client.db(dbName).collection(collectionName).findOne({
            username: req.body.username
        }, (err, user) => {
            if (user !== null) {
                res.send({success: false, error: 'Имя уже занято'});
                client.close();
                return;
            }

            MongoClient.connect(connectionUrl, (err, client) => {
                const passwordHash = bcrypt.hashSync(req.body.password, 10);
                client.db(dbName).collection(collectionName).insertOne({
                    username: req.body.username,
                    email: req.body.email,
                    passwordHash: passwordHash,
                    isAdmin: false
                }, (err, result) => {
                    if (err) {
                        res.send(err);
                        client.close();
                    }
                    res.send({success: true});
                    client.close();
               });
            });

        });
    });
});

app.post('/api/login', (req, res) => {
    MongoClient.connect(connectionUrl, (err, client) => {
        client.db(dbName).collection(collectionName).findOne({
            username: req.body.username
        }, (err, user) => {
            if (user === null) {
                res.send({success: false, error: 'Пользователя с таким именем не существует'});
                client.close();
                return;
            }
            // compare password and hash
            if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
                const token = jwt.sign({_id: user._id}, config.secret);
                const userToSend = {
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin
                };
                res.send({success: true, user: userToSend, token: token});
                client.close();
            } else {
                res.send({success: false, error: 'Неверный пароль'});
                client.close();
                return;
            }
        });
    });
});

const tokenVerifier = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].replace('Bearer ', '');

    if (!token) {
        return res.sendFile(path.join(__dirname, pathToHtml));
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.sendFile(path.join(__dirname, pathToHtml));
        }
        next();
    });
}

app.use(tokenVerifier);

app.get('/api/verifytoken', (req, res) => {
    const token = req.headers['authorization'].replace('Bearer ', '');
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.send({success: false, error: 'token error'});
        }

        const userId = decoded._id;

        MongoClient.connect(connectionUrl, (err, client) => {
            client.db(dbName).collection(collectionName).findOne({
                '_id': new ObjectID(userId)
            }, (err, user) => {
                if (user === null) {
                    res.send({success: false, error: 'can not find user by token'});
                    client.close();
                    return;
                } else {
                    const userToSend = {
                        username: user.username,
                        email: user.email,
                        isAdmin: user.isAdmin
                    };
                    res.send({success: true, user: userToSend});
                    client.close();
                }
            });
        });
    });
});

app.post('/api/savewatchlist', (req, res) => {
    MongoClient.connect(connectionUrl, (err, client) => {
        client.db(dbName).collection(collectionName).update({
            username: req.body.username
        }, {
            $set: {stocksWatch: req.body.stocksWatch}
        }, (err, data) => {
            if (err) {
                res.send({success: false, error: 'error has occured'});
                client.close();
                return;
            }
            res.send({success: true, stocksWatch: data.stocksWatch});
            client.close();
        });
    });
});

app.get('/api/getwatchlist', (req, res) => {
    MongoClient.connect(connectionUrl, (err, client) => {
        client.db(dbName).collection(collectionName).findOne({
            username: req.query.username
        }, (err, user) => {
            if (user === null) {
                res.send({success: false, error: 'can not find user'});
                client.close();
                return;
            } else {
                res.send({success: true, stocksWatch: user.stocksWatch});
                client.close();
            }
        });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, pathToHtml));
});

const port = 8080;

app.listen(port, () => {
    console.log(`listen on ${port}`);
});
