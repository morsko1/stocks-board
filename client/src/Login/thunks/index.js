import * as actionsLogin from '../actions';
import {push} from 'react-router-redux';
import axios from 'axios';

export const login = () => (dispatch, getState) => {
    const state = getState().login;
    const {username, password} = state.input;
    dispatch(actionsLogin.resetInput());
    const body = {
        username,
        password
    };
    dispatch(actionsLogin.loginRequest());
    axios.post('/api/login', body)
        .then((response) => {
            if (!response.data.success) {
                dispatch(actionsLogin.loginFailure({error: response.data.error}))
                return;
            }
            dispatch(actionsLogin.loginSuccess(response.data));
            dispatch(push('/'));
        })
        .catch((error) => {
            dispatch(actionsLogin.loginFailure(error));
        });
}
