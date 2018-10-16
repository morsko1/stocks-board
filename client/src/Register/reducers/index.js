import * as actionsRegister from '../actions';

const initialState = {
    input: {
        username: '',
        email: '',
        password: '',
        confirm: ''
    },
    registerError: null,
    isFetching: false,
    isPasswordValid: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionsRegister.HANDLE_INPUT:
            const newInput = {
                ...state.input,
                [action.payload.field]: action.payload.text
            };
            return {
                ...state,
                input: newInput,
            };

        case actionsRegister.RESET_INPUT:
            return {
                ...state,
                input: {
                    username: '',
                    email: '',
                    password: '',
                    confirm: ''
                }
            };

        case actionsRegister.SET_PASSWORD_ERROR:
            return {
                ...state,
                isPasswordValid: false
            };

        case actionsRegister.RESET_PASSWORD_ERROR:
            return {
                ...state,
                isPasswordValid: true
            };

        case actionsRegister.REGISTER_REQUEST:
            return {
                ...state,
                isFetching: true,
                registerError: null
            };

        case actionsRegister.REGISTER_SUCCESS:
            return {
                ...state,
                isFetching: false
            };

        case actionsRegister.REGISTER_FAILURE:
            return {
                ...state,
                isFetching: false,
                registerError: action.payload.error
            };

        default:
            return state;
    }
};
