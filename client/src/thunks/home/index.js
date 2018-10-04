import * as actionsHome from '../../actions/home';
import * as util from '../../common/util';
import axios from 'axios';

export const getStocks = () => (dispatch, getState) => {
    const stocksExist = getState().home.stocks.data.length;
    const date = new Date();
    const day = date.getDay();
    const hours = date.getHours();
    // avoid unnecessary calls at non-working days and time
    if (stocksExist && ((day === 0 || day === 6) || (hours < 10 || hours > 19))) {
        return;
    }

    dispatch(actionsHome.getStocksRequest());

    axios.get(util.urlStocks)
        .then((response) => {
            if (!response.data.securities.data.length) {
                dispatch(actionsHome.getStocksFailure({text: 'response empty'}));
                return;
            }

            const convertedData = util.convertStocksResponseToStocks(response.data);
            dispatch(getStocksSuccess(convertedData));
        })
        .catch((error) => {
            dispatch(actionsHome.getStocksFailure(error));
        });
};

const getStocksSuccess = (data) => (dispatch) => {
    dispatch(actionsHome.getStocksSuccess(data));
}

// todo: set values for previous day too
export const getCurrencies = () => (dispatch, getState) => {
    const currencies = getState().home.currencies;
    if (currencies.data.length) {
        return;
    }
    dispatch(actionsHome.getCurrenciesRequest());
    axios.get(util.urlCurrencies)
        .then((response) => {
            const convertedData = util.convertCurrenciesResponseToCurrencies(response.data);
            dispatch(actionsHome.getCurrenciesSuccess(convertedData));
        })
        .catch((error) => {
            console.log('error =', error);
        });
}
