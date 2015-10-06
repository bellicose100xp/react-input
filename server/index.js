/**
 * Created by buggy on 10/4/15.
 */
'use strict';
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

let db = mongoose.connect('mongodb://buggy:oscillatoria@ds029804.mongolab.com:29804/registry');
let Customer = require('./models/customerModel');

let app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//allow cross origin request
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let customerRouter = express.Router();

customerRouter.route('/customers')
    .post((req, res) => {
        let customer = new Customer(req.body); // creates an instance using mongoose
        customer.save(); // this will save customer to mongodb
        console.log(customer);
        res.status(201).send(customer); // status 201 means created
    })
    .get((req, res) => {
        Customer.find((err, data) => {
            if (err) {
                // 500 is error
                res.status(500).send(err);
            } else {
                res.json(data);
            }
        });
    });

customerRouter.route('/customers/:customerId')
    .get((req, res) => {
        Customer.findById(req.params.customerId, (err, data) => {
            if (err) {
                // 500 is error
                res.status(500).send(err);
            } else {
                res.json(data);
            }
        });
    });

app.use('/api', customerRouter);

app.get('/', (req, res) => {
    res.send('welcome to my REST API');
});

app.listen(port, () => {
    console.log(`Running the REST server on ${port}`);
});