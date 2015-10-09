/**
 * Created by buggy on 10/4/15.
 */
'use strict';
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

let db = mongoose.connect('mongodb://buggy:oscillatoria@ds029804.mongolab.com:29804/registry');

let app = express();
let port = process.env.PORT || 3000;

//parse json from incoming message for use in the node server
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//allow cross origin request
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let customerRouter = require('./routes/customerRoutes');

app.use('/api', customerRouter);

app.get('/', (req, res) => {
    res.send('welcome to my REST API');
});

app.listen(port, () => {
    console.log(`Running the REST server on ${port}`);
});