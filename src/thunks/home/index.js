import * as actionsHome from '../../actions/home';
import * as util from '../../common/util';

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

    fetch(util.url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (!data.securities.data.length) {
                dispatch(actionsHome.getStocksFailure({text: 'response empty'}));
                return;
            }

            const sort = getState().home.sort;
            const convertedData = util.convertStocksResponseToStocks(data, sort);

            dispatch(getStocksSuccess(convertedData));
        })
        .catch(
            error => dispatch(actionsHome.getStocksFailure(error))
        );
};

const getStocksSuccess = (data) => (dispatch, getState) => {
    const sort = getState().home.sort;
    dispatch(actionsHome.getStocksSuccess(data, sort));
}

export const sortRowsBy = (value) => (dispatch, getState) => {
    if (!value) return;
    const stocks = getState().home.stocks;
    dispatch(actionsHome.setSortParameters(value));
    dispatch(getStocksSuccess(stocks.data));
}
