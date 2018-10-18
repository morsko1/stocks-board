export const HANDLE_INPUT = 'login/HANDLE_INPUT';
export const RESET_INPUT = 'login/RESET_INPUT';
export const LOGIN_REQUEST = 'login/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'login/LOGIN_FAILURE';

export const handleInput = (field, text) => ({
    type: HANDLE_INPUT,
    payload: {
        field,
        text
    }
});

export const resetInput = () => ({
    type: RESET_INPUT
});

export const loginRequest = () => ({
    type: LOGIN_REQUEST
});

export const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: {
        data
    }
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: {
        error
    }
});
