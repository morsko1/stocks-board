import * as actionsLogin from '../actions';

const initialState = {
    input: {
        username: '',
        password: '',
    },
    loginError: null,
    isFetching: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionsLogin.HANDLE_INPUT:
            const newInput = {
                ...state.input,
                [action.payload.field]: action.payload.text
            };
            return {
                ...state,
                input: newInput,
            };

        case actionsLogin.RESET_INPUT:
            return {
                ...state,
                input: {
                    username: '',
                    password: ''
                }
            };

        case actionsLogin.LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
                loginError: null
            };

        case actionsLogin.LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false
            };

        case actionsLogin.LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                loginError: action.payload.error
            };

        case actionsLogin.RESET_ERROR:
            return {
                ...state,
                loginError: null
            };

        default:
            return state;
    }
};
