import * as actionsFullTable from '../actions';
import * as util from '~/common/util';

const numberRowsToShow = 30;

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
    currencies: {data: []},
    numberRowsToShow: numberRowsToShow,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionsFullTable.GET_STOCKS_REQUEST:
            return {
                ...state,
                stocksFetching: true,
                stocksFetchingError: null
            };

        case actionsFullTable.GET_STOCKS_SUCCESS:
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

        case actionsFullTable.GET_STOCKS_FAILURE:
            return {
                ...state,
                stocksFetching: false,
                stocksFetchingError: action.payload.error,
            };

        case actionsFullTable.SET_SORT_PARAMETERS:
            return {
                ...state,
                sort: {
                    parameter: action.payload.value,
                    orderByDesc: (action.payload.value === state.sort.parameter) ? !state.sort.orderByDesc : false
                }
            };

        case actionsFullTable.SHOW_OR_HIDE_FILTERS:
            return {
                ...state,
                isFiltersVisible: !state.isFiltersVisible
            };

        // case actionsFullTable.HANDLE_INPUT:
        //     return {
        //         ...state,
        //         filters: util.setFiltersState(
        //             state.filters,
        //             action.payload.filter,
        //             action.payload.type,
        //             action.payload.value
        //         )
        //     };

        case actionsFullTable.APPLY_FILTERS:
            return {
                ...state,
                filters: util.convertFiltersValues(action.payload.filters)
            };
        case actionsFullTable.RESET_FILTERS:
            return {
                ...state,
                filters: util.resetFilters(state.filters),
                filteredStocks: state.stocks,
                numberRowsToShow: numberRowsToShow
            };

        case actionsFullTable.GET_CURRENCIES_REQUEST:
            return {
                ...state,
            };

        case actionsFullTable.GET_CURRENCIES_SUCCESS:
            return {
                ...state,
                currencies: {
                    data: action.payload.data
                }
            };

        case actionsFullTable.EXPAND_TABLE:
            return {
                ...state,
                numberRowsToShow: Math.min(
                    state.numberRowsToShow + numberRowsToShow,
                    state.filteredStocks.data.length
                )
            };

        case actionsFullTable.COLLAPSE_TABLE:
            return {
                ...state,
                numberRowsToShow: Math.max(
                    Math.min(
                        state.numberRowsToShow - numberRowsToShow,
                        state.filteredStocks.data.length - numberRowsToShow
                    ),
                    numberRowsToShow
                )
            };

        default:
            return state;
    }
};
