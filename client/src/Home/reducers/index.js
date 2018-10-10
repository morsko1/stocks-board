import * as actionsHome from '../actions';
import * as util from '../../common/util';

const initialState = {
    stocks: {data: []},
    stocksFetching: false,
    stocksFetchingError: null,
    currencies: {data: []}
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
                    data: util.setStocksDataWithoutSort(
                        action.payload.data,
                        state.stocks.data,
                    )
                },
            };

        case actionsHome.GET_STOCKS_FAILURE:
            return {
                ...state,
                stocksFetching: false,
                stocksFetchingError: action.payload.error
            };

        case actionsHome.GET_CURRENCIES_REQUEST:
            return {
                ...state
            };

        case actionsHome.GET_CURRENCIES_SUCCESS:
            return {
                ...state,
                currencies: {
                    data: action.payload.data
                }
            };

        default:
            return state;
    }
};
