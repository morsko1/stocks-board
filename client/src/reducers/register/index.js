import * as actionsRegister from '../../actions/register';
import * as util from '../../common/util';

const initialState = {
    testData: 'testData'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionsRegister.TEST:
            return {
                ...state,
            };

        default:
            return state;
    }
};
