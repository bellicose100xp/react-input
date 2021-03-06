'use strict';

let express = require('express');
let CustomerModel = require('../models/customerModel');
let customerRouter = express.Router();
let transporter = require('../mailer/mailer');

let mailOptions = {
    from: 'Test 4hso <test@4hso.com>',
    to: 'admin@4hso.com',
    subject: 'Customer added to Simple List',
    text: 'A customer was added'
};

// remove boilerplate for socket.io
// attach io to req for all routes to use
customerRouter.use((req, res, next) => {
    req.io = req.app.get('io');
    next();
});

customerRouter.route('/customers')
    .post((req, res) => {
        let customer = new CustomerModel(req.body); // creates an instance using mongoose
        customer.save(); // this will save customer to mongodb
        // console.log(customer);

        let currentDateTime = new Date();

        //customizing message body
        mailOptions.text = `${customer.firstName} ${customer.lastName} was added to simple list on ${currentDateTime}`;

        //send email here
        /*transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
         return console.log(error);
         }
         console.log(`Message sent: ${info.response}`)
         });*/

        //once and app.set has been done in index.js
        req.io.emit('update'); //update on customer added

        res.status(201).send(customer); // status 201 means created
    })
    .get((req, res) => {
        CustomerModel
            .find()
            .sort({created_at: -1})
            .limit(50)
            .exec((err, data) => {
                if (err) {
                    // 500 is error
                    res.status(500).send(err);
                } else {
                    res.json(data);
                }
            });
    });


customerRouter.route('/search')
    .get((req, res) => {
        // console.log(req.query.searchTerm);
        let searchTerm = req.query.searchTerm;
        CustomerModel
            .find({
                $or: [
                    {firstName: new RegExp(searchTerm, 'i')},
                    {lastName: new RegExp(searchTerm, 'i')}
                ]
            })
            .
            limit(10)
            .exec((err, data) => {
                if (err) {
                    // 500 is error
                    res.status(500).send(err);
                } else {
                    res.json(data);
                }
            });
    });

customerRouter.route('/allCustomers')
    .get((req, res) => {
        CustomerModel
            .find()
            .exec((err, data) => {
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
            res.status(404).send('no customer found!!'); // this is mongoose didn't find any books
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
                req.io.emit('update'); // update on individual customer change
                res.json(req.customer);
            }
        });
    })
    .delete((req, res) => {
        req.customer.remove(err => {
            if (err) {
                res.status(500).send(err);
            } else {
                req.io.emit('update'); // update on delete
                res.status(204).send('Removed'); // 204 means No content // need to send for flux event
                //console.log('customer removed on server');
            }
        })
    });

module.exports = customerRouter;