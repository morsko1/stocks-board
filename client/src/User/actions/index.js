export const GET_USER_REQUEST = 'user/GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'user/GET_USER_FAILURE';
export const SET_USER = 'user/SET_USER';
export const RESET_USER = 'user/RESET_USER';

export const getUserRequest = () => ({
    type: GET_USER_REQUEST
});

export const getUserSuccess = () => ({
    type: GET_USER_SUCCESS
});

export const getUserFailure = (error) => ({
    type: GET_USER_FAILURE,
    payload: {
        error
    }
});

export const setUser = (user) => ({
    type: SET_USER,
    payload: {
        user
    }
});

export const resetUser = () => ({
    type: RESET_USER
});
