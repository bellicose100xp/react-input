/**
 * Created by admin on 10/21/2015.
 */
'use strict';

const socketServer = 'https://secure-chamber-4968.herokuapp.com';
const restServerAPI = `${socketServer}/api/customers`;
const restSearchAPI = `${socketServer}/api/search`;
const getAllCustomerAPI = `${socketServer}/api/allCustomers`;

export {
    restServerAPI,
    socketServer,
    restSearchAPI,
    getAllCustomerAPI
};