import * as actionsRegister from '../actions';
import {push} from 'react-router-redux';
import axios from 'axios';

export const register = () => (dispatch, getState) => {
    const state = getState().register;
    const {username, email, password, confirm} = state.input;
    if (password !== confirm) {
        dispatch(actionsRegister.setPasswordError());
        return;
    } else {
        dispatch(actionsRegister.resetPasswordError());
    }
    dispatch(actionsRegister.resetInput());
    const body = {
        username,
        email,
        password
    };
    dispatch(actionsRegister.registerRequest());
    axios.post('/api/register', body)
        .then((response) => {
            if (!response.data.success) {
                dispatch(actionsRegister.registerFailure({error: response.data.error}))
                return;
            }
            dispatch(actionsRegister.registerSuccess(response.data));
            dispatch(push('/'));
        })
        .catch((error) => {
            dispatch(actionsRegister.registerFailure(error));
        });
}
