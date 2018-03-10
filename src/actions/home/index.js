export const GET_STOCKS_REQUEST = 'home/GET_STOCKS_REQUEST';
export const GET_STOCKS_SUCCESS = 'home/GET_STOCKS_SUCCESS';
export const GET_STOCKS_FAILURE = 'home/GET_STOCKS_FAILURE';

export const SET_SORT_PARAMETERS = 'home/SET_SORT_PARAMETERS';

export const SHOW_OR_HIDE_FILTERS = 'home/SHOW_OR_HIDE_FILTERS';

export const HANDLE_INPUT = 'home/HANDLE_INPUT';

export const APPLY_FILTERS = 'home/APPLY_FILTERS';

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

export const handleFiltersInput = (filter, type, value) => ({
    type: HANDLE_INPUT,
    payload: {
        filter,
        type,
        value
    }
});

export const applyFilters = () => ({
    type: APPLY_FILTERS
});

