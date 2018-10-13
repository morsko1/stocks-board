import * as actionsUser from '../actions';

const initialState = {
    testData: 'testData'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionsUser.TEST:
            return {
                ...state,
            };

        default:
            return state;
    }
};
