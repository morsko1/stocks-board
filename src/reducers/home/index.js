import * as actionsHome from '../../actions/home';
import * as util from '../../common/util';

const initialState = {
    stocks: {data: []},
    stocksFetching: false,
    stocksFetchingError: null,
    sort: {
        parameter: 'capitalization',
        orderByDesc: false,
    }
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
                    data: util.setStocksData(
                        action.payload.data,
                        state.stocks.data,
                        action.payload.sort
                    )
                }
            };

        case actionsHome.GET_STOCKS_FAILURE:
            return {
                ...state,
                stocksFetching: false,
                stocksFetchingError: action.payload.error,
            };

        case actionsHome.SET_SORT_PARAMETERS:
            return {
                ...state,
                sort: {
                    parameter: action.payload.value,
                    orderByDesc: (action.payload.value === state.sort.parameter) ? !state.sort.orderByDesc : false
                }
            };

        default:
            return state;
    }
};
