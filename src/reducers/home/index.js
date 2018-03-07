import * as actionsHome from '../../actions/home';
import * as util from '../../common/util';

const initialState = {
    stocks: {data: []},
    stocksFetching: false,
    stocksFetchingError: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionsHome.GET_STOCKS_REQUEST:
            return {
                ...state,
                stocksFetching: true,
                stocksFetchingError: null
            };

        case actionsHome.GET_STOCKS_SUCCESS:
            return {
                ...state,
                stocksFetching: false,
                stocksFetchingError: null,
                stocks: {
                    data: util.setStocksData(action.payload.data, state.stocks.data)
                }
            };

        case actionsHome.GET_STOCKS_FAILURE:
            return {
                ...state,
                stocksFetching: false,
                stocksFetchingError: action.payload.error,
            };

        default:
            return state;
    }
};
