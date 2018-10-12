import * as actionsLogin from '../actions';
import * as util from '../../common/util';

const initialState = {
    testData: 'testData'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionsLogin.TEST:
            return {
                ...state,
            };

        default:
            return state;
    }
};
