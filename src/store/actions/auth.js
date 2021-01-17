import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email , password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCaY8tVBN5uGf6038kj-w30OLjiVwJz_wQ', {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data));
        }).catch(err => {
            console.log(err);
            console.log(err.response.request._response);
            dispatch(authFail(err));
        });
    }
}