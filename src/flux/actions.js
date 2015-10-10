/**
 * Created by admin on 10/2/2015.
 */
'use strict';
import dispatcher from './dispatcher';
import constants from './constants';


let Actions = {

    addCustomer: newCustomer => {

        if (newCustomer.firstName !== '' && newCustomer.lastName !== '') {
            $.ajax({
                type: "POST",
                url: 'http://localhost:8000/api/customers',
                data: newCustomer,
                success: (data) => {
                    dispatcher.dispatch({
                        actionType: constants.ADD_CUSTOMER,
                        addedCustomer: data
                    });
                },
                dataType: 'json'
            });
        }
    },

    updateCustomer: customerToUpdate => {

        if (customerToUpdate.firstName !== '' && customerToUpdate.lastName !== '') {
            $.ajax({
                type: "PUT",
                url: `http://localhost:8000/api/customers/${customerToUpdate.id}`,
                data: customerToUpdate,
                success: (data) => {
                    dispatcher.dispatch({
                        actionType: constants.UPDATE_CUSTOMER,
                        updatedCustomer: data
                    });
                },
                dataType: 'json'
            });
        }
    },

    removeCustomer: customerToRemove => {
        $.ajax({
            type: "DELETE",
            url: `http://localhost:8000/api/customers/${customerToRemove._id}`,
            data: customerToRemove,
            success: () => {
                console.log('firing event after removing customer');
                dispatcher.dispatch({
                    actionType: constants.REMOVE_CUSTOMER,
                    removedCustomer: ''
                });
            },
            dataType: 'json'
        });
    }
};

export default Actions;
