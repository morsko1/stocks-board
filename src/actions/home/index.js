export const GET_STOCKS_REQUEST = 'home/GET_STOCKS_REQUEST';
export const GET_STOCKS_SUCCESS = 'home/GET_STOCKS_SUCCESS';
export const GET_STOCKS_FAILURE = 'home/GET_STOCKS_FAILURE';

export const SET_SORT_PARAMETERS = 'home/SET_SORT_PARAMETERS';

export const getStocksRequest = () => ({
    type: GET_STOCKS_REQUEST
});

export const getStocksSuccess = (data, sort) => ({
    type: GET_STOCKS_SUCCESS,
    payload: {
        data,
        sort
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
