export const HANDLE_INPUT = 'register/HANDLE_INPUT';
export const RESET_INPUT = 'register/RESET_INPUT';
export const SET_PASSWORD_ERROR = 'register/SET_PASSWORD_ERROR';
export const RESET_PASSWORD_ERROR = 'register/RESET_PASSWORD_ERROR';
export const REGISTER_REQUEST = 'register/REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'register/REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'register/REGISTER_FAILURE';

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

export const setPasswordError = () => ({
    type: SET_PASSWORD_ERROR
});

export const resetPasswordError = () => ({
    type: RESET_PASSWORD_ERROR
});

export const registerRequest = () => ({
    type: REGISTER_REQUEST
});

export const registerSuccess = () => ({
    type: REGISTER_SUCCESS
});

export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: {
        error
    }
});
