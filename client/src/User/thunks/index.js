import * as actionsUser from '../actions';
import axios from 'axios';

export const getUser = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return;
    }
    dispatch(actionsUser.getUserRequest());
    return axios.get('/api/verifytoken', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (!response.data.success) {
            localStorage.removeItem('token');
            dispatch(actionsUser.getUserFailure(error));
        }
        dispatch(actionsUser.getUserSuccess());
        dispatch(actionsUser.setUser(response.data.user));
        return Promise.resolve(response.data.user.username);
    }).catch((error) => {
        localStorage.removeItem('token');
        dispatch(actionsUser.getUserFailure(error));
    });
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch(actionsUser.resetUser());
};
