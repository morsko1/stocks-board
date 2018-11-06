export const GET_STOCKS_REQUEST = 'fullTable/GET_STOCKS_REQUEST';
export const GET_STOCKS_SUCCESS = 'fullTable/GET_STOCKS_SUCCESS';
export const GET_STOCKS_FAILURE = 'fullTable/GET_STOCKS_FAILURE';

export const SET_SORT_PARAMETERS = 'fullTable/SET_SORT_PARAMETERS';

export const SHOW_OR_HIDE_FILTERS = 'fullTable/SHOW_OR_HIDE_FILTERS';

// export const HANDLE_INPUT = 'fullTable/HANDLE_INPUT';

export const APPLY_FILTERS = 'fullTable/APPLY_FILTERS';
export const RESET_FILTERS = 'fullTable/RESET_FILTERS';

export const GET_CURRENCIES_REQUEST = 'fullTable/GET_CURRENCIES_REQUEST';
export const GET_CURRENCIES_SUCCESS = 'fullTable/GET_CURRENCIES_SUCCESS';
export const GET_CURRENCIES_FAILURE = 'fullTable/GET_CURRENCIES_FAILURE';

export const EXPAND_TABLE = 'fullTable/EXPAND_TABLE';
export const COLLAPSE_TABLE = 'fullTable/COLLAPSE_TABLE';

export const getStocksRequest = () => ({
    type: GET_STOCKS_REQUEST
});

export const getStocksSuccess = (data) => ({
    type: GET_STOCKS_SUCCESS,
    payload: {
        data
    }
});

export const getStocksFailure = (error) => ({
    type: GET_STOCKS_FAILURE,
    payload: {
        error
    }
});

export const setSortParameters = (value) => ({
    type: SET_SORT_PARAMETERS,
    payload: {
        value
    }
});

export const showOrHideFilters = () => ({
    type: SHOW_OR_HIDE_FILTERS
});

// export const handleFiltersInput = (filter, type, value) => ({
//     type: HANDLE_INPUT,
//     payload: {
//         filter,
//         type,
//         value
//     }
// });

export const applyFilters = (filters) => ({
    type: APPLY_FILTERS,
    payload: {
        filters
    }
});

export const resetFilters = () => ({
    type: RESET_FILTERS
});

export const getCurrenciesRequest = () => ({
    type: GET_CURRENCIES_REQUEST
});

export const getCurrenciesSuccess = (data) => ({
    type: GET_CURRENCIES_SUCCESS,
    payload: {
        data
    }
});

export const expandTable = () => ({
    type: EXPAND_TABLE
});

export const collapseTable = () => ({
    type: COLLAPSE_TABLE
});
