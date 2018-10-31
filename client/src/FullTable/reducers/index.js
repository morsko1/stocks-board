import * as actionsHome from '../actions';
import * as util from '~/common/util';

const initialState = {
    stocks: {data: []},
    stocksFetching: false,
    stocksFetchingError: null,
    sort: {
        parameter: 'volumeToday',
        orderByDesc: false,
    },
    filteredStocks: {data: []},
    isFiltersVisible: false,
    filters: [
        {
            name: 'volumeToday',
            from: '',
            to: ''
        },
        {
            name: 'capitalization',
            from: '',
            to: ''
        }
    ],
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
                    data: util.setStocksData(
                        action.payload.data,
                        state.stocks.data,
                        state.sort
                    )
                },
                filteredStocks: {
                    data: util.filterStocks(
                        action.payload.data,
                        state.filters,
                        state.sort
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

        case actionsHome.SHOW_OR_HIDE_FILTERS:
            return {
                ...state,
                isFiltersVisible: !state.isFiltersVisible
            };

        // case actionsHome.HANDLE_INPUT:
        //     return {
        //         ...state,
        //         filters: util.setFiltersState(
        //             state.filters,
        //             action.payload.filter,
        //             action.payload.type,
        //             action.payload.value
        //         )
        //     };

        case actionsHome.APPLY_FILTERS:
            return {
                ...state,
                filters: util.convertFiltersValues(action.payload.filters)
            };
        case actionsHome.RESET_FILTERS:
            return {
                ...state,
                filters: util.resetFilters(state.filters)
            };

        case actionsHome.GET_CURRENCIES_REQUEST:
            return {
                ...state,
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
