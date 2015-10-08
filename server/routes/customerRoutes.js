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

customerRouter.route('/customers/:customerId')
    .get((req, res) => {
        CustomerModel.findById(req.params.customerId, (err, data) => {
            if (err) {
                // 500 is error
                res.status(500).send(err);
            } else {
                res.json(data);
            }
        });
    })
    .put((req, res) => {
        CustomerModel.findById(req.params.customerId, (err, data) => {
            if (err) {
                // 500 is error
                res.status(500).send(err);
            } else {
                data.firstName = req.body.firstName;
                data.lastName = req.body.lastName;
                data.save();
                res.json(data);
            }
        });
    });

module.exports = customerRouter;