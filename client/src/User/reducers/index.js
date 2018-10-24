import * as actionsUser from '../actions';

const initialState = {
    user: null,
    isFetching: false,
    userError: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionsUser.GET_USER_REQUEST:
            return {
                ...state,
                isFetching: true,
                userError: null
            };

        case actionsUser.GET_USER_SUCCESS:
            return {
                ...state,
                isFetching: false
            };

        case actionsUser.GET_USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                userError: action.payload.error
            };

        case actionsUser.SET_USER:
            return {
                ...state,
                user: action.payload.user
            };

        case actionsUser.RESET_USER:
            return {
                ...state,
                user: null
            };

        default:
            return state;
    }
};
