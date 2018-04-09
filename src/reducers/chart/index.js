import * as actionsChart from '../../actions/chart';

const initialState = {
    ticker: '',
    stock: {},
    stockHistoryData: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionsChart.SET_CURRENT_TICKER:
            return {
                ...state,
                ticker: action.payload.ticker
            };

        default:
            return state;
    }
};
