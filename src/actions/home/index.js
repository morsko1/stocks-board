export const GET_STOCKS_REQUEST = 'counter/GET_STOCKS_REQUEST';
export const GET_STOCKS_SUCCESS = 'counter/GET_STOCKS_SUCCESS';
export const GET_STOCKS_FAILURE = 'counter/GET_STOCKS_FAILURE';

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
