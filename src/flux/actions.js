/**
 * Created by admin on 10/2/2015.
 */
'use strict';
import dispatcher from './dispatcher';
import constants from './constants';

let Actions = {

    addCustomer: newCustomer => {
        dispatcher.dispatch({
            actionType: constants.ADD_CUSTOMER,
            newCustomer: newCustomer
        });
    }
};

export default Actions;
