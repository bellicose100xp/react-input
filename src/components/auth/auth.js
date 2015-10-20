/**
 * Created by admin on 10/19/2015.
 */
'use strict';
import Firebase from 'firebase';
var ref = new Firebase('https://buggy-react.firebaseio.com/');

export default {
    login(email, pass, cb) {
        ref.authWithPassword({
            email: email,
            password: pass
        }, (error, authData) => {
            if (error) {
                cb(false);
                console.log("Login Failed!", error);
            } else {
                cb(true);
                //console.log("Authenticated successfully with payload:", authData);
            }
        });
    },

    logout(){
        ref.unauth();
        console.log('logged out...');

    },

    loggedIn(){
        let authData = ref.getAuth();

        //if (authData) {
        //    console.log("User " + authData.uid + " is logged in with " + authData.provider);
        //} else {
        //    console.log("User is logged out");
        //}

        return !!authData;
    },

    onChange() {}
};

