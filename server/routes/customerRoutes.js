'use strict';

let express = require('express');
let CustomerModel = require('../models/customerModel');

let customerRouter = express.Router();

customerRouter.route('/customers')
    .post((req, res) => {
        let customer = new CustomerModel(req.body); // creates an instance using mongoose
        customer.save(); // this will save customer to mongodb
        // console.log(customer);
        res.status(201).send(customer); // status 201 means created
    })
    .get((req, res) => {
        CustomerModel.find((err, data) => {
            if (err) {
                // 500 is error
                res.status(500).send(err);
            } else {
                res.json(data);
            }
        });
    });

//middleware to remove boilerplate code of finding customer by ID
customerRouter.use('/customers/:customerId', (req, res, next) => {
    CustomerModel.findById(req.params.customerId, (err, data) => {
        if (err) {
            // 500 is error :: this is error processing request
            res.status(500).send(err);
        } else if (data) {
            //attaching the data that mongose found in database to req for easier retrieval
            req.customer = data;
            next();
        } else {
            res.status(404).send('no book found!!'); // this is mongoose didn't find any books
        }
    })
});

customerRouter.route('/customers/:customerId')
    .get((req, res) => {
        res.json(req.customer); // send the json object
    })
    .put((req, res) => {
        req.customer.firstName = req.body.firstName;
        req.customer.lastName = req.body.lastName;

        req.customer.save(err => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.customer);
            }
        });
    })
    .delete((req, res) => {
        req.customer.remove(err => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204); // 204 means No content
            }
        })
    });

module.exports = customerRouter;