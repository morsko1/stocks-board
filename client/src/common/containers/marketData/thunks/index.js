import * as actionsMarketData from '../actions';
import * as util from '~/common/util';
import * as urls from '~/common/urls';
import axios from 'axios';

export const getStocks = () => (dispatch, getState) => {
    const stocksExist = getState().marketData.stocks.data.length;
    const date = new Date();
    const day = date.getDay();
    const hours = date.getHours();
    // avoid unnecessary calls at non-working days and time
    if (stocksExist && ((day === 0 || day === 6) || (hours < 10 || hours > 19))) {
        return;
    }

    dispatch(actionsMarketData.getStocksRequest());

    return axios.get(urls.urlStocks)
        .then((response) => {
            if (!response.data.securities.data.length) {
                dispatch(actionsMarketData.getStocksFailure({text: 'response empty'}));
                return;
            }

            const convertedData = util.convertStocksResponseToStocks(response.data);
            dispatch(actionsMarketData.getStocksSuccess(convertedData));
            return Promise.resolve(convertedData);
        })
        .catch((error) => {
            dispatch(actionsMarketData.getStocksFailure(error));
        });
};

// todo: set values for previous day too
export const getCurrencies = () => (dispatch, getState) => {
    const currencies = getState().marketData.currencies;
    if (currencies.data.length) {
        return;
    }
    dispatch(actionsMarketData.getCurrenciesRequest());
    axios.get(urls.urlCurrencies)
        .then((response) => {
            const convertedData = util.convertCurrenciesResponseToCurrencies(response.data);
            dispatch(actionsMarketData.getCurrenciesSuccess(convertedData));
        })
        .catch((error) => {
            console.log('error =', error);
        });
}
