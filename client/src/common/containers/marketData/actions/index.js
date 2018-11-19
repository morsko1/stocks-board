export const GET_STOCKS_REQUEST = 'marketData/GET_STOCKS_REQUEST';
export const GET_STOCKS_SUCCESS = 'marketData/GET_STOCKS_SUCCESS';
export const GET_STOCKS_FAILURE = 'marketData/GET_STOCKS_FAILURE';

export const GET_CURRENCIES_REQUEST = 'marketData/GET_CURRENCIES_REQUEST';
export const GET_CURRENCIES_SUCCESS = 'marketData/GET_CURRENCIES_SUCCESS';
export const GET_CURRENCIES_FAILURE = 'marketData/GET_CURRENCIES_FAILURE';

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
