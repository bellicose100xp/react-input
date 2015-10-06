/**
 * Created by buggy on 10/4/15.
 */
'use strict';
let express = require('express');
let mongoose = require('mongoose');

let db = mongoose.connect('mongodb://buggy:oscillatoria@ds029804.mongolab.com:29804/registry');
let Customer = require('./models/customerModel');
const b = 2;
let app = express();

let port = process.env.PORT || 3000;

let customerRouter = express.Router();

customerRouter.route('/customers')
    .get((req, res) => {

        Customer.find((err, data) => {
            if (err) {
                console.log(`error getting customers: ${err}`);
            } else {
                res.json(data);
            }
        });

       // let responseJson = {customers: 'this is where we will see all customers'};
        //res.json(responseJson);
    });

app.use('/api', customerRouter);

app.get('/', (req, res) => {
    res.send('welcome to my REST API');
});

app.listen(port, () => {
    console.log(`Running the REST server on ${port}`);
});