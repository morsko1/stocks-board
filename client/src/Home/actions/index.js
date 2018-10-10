export const GET_STOCKS_REQUEST = 'home/GET_STOCKS_REQUEST';
export const GET_STOCKS_SUCCESS = 'home/GET_STOCKS_SUCCESS';
export const GET_STOCKS_FAILURE = 'home/GET_STOCKS_FAILURE';

export const GET_CURRENCIES_REQUEST = 'home/GET_CURRENCIES_REQUEST';
export const GET_CURRENCIES_SUCCESS = 'home/GET_CURRENCIES_SUCCESS';
export const GET_CURRENCIES_FAILURE = 'home/GET_CURRENCIES_FAILURE';

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

export const getCurrenciesRequest = () => ({
    type: GET_CURRENCIES_REQUEST
});

export const getCurrenciesSuccess = (data) => ({
    type: GET_CURRENCIES_SUCCESS,
    payload: {
        data
    }
});
