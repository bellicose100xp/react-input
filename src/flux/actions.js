/**
 * Created by admin on 10/2/2015.
 */
'use strict';
import dispatcher from './dispatcher';
import constants from './constants';
import {restServerAPI} from '../components/common/appConstants';

let Actions = {

    addCustomer: newCustomer => {

        if (newCustomer.firstName !== '' && newCustomer.lastName !== '') {
            $.ajax({
                type: "POST",
                url: restServerAPI,
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
                url: `${restServerAPI}/${customerToUpdate.id}`,
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
            url: `${restServerAPI}/${customerToRemove._id}`,
            data: customerToRemove,
            success: () => {
                //console.log('firing event after removing customer');
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
