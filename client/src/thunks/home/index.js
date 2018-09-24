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

    fetch(util.urlStocks)
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

const getStocksSuccess = (data) => (dispatch) => {
    dispatch(actionsHome.getStocksSuccess(data));
}

export const sortRowsBy = (value) => (dispatch, getState) => {
    if (!value) return;
    const stocks = getState().home.stocks;
    dispatch(actionsHome.setSortParameters(value));
    dispatch(getStocksSuccess(stocks.data));
    // if (getState().home.isFiltersVisible) {
    //     dispatch(applyFilters());
    // }
}

export const showOrHideFilters = () => (dispatch, getState) => {
    const isFiltersVisible = getState().home.isFiltersVisible;
    if (isFiltersVisible) {
        dispatch(resetFilters());
    }

    dispatch(actionsHome.showOrHideFilters());

    // animation for filters dropdown
    const filtersDiv = document.querySelector('.filters');
    const filtersForm = document.querySelector('.filters-form');
    filtersDiv.clientHeight ?
        filtersDiv.style.height = 0 :
        filtersDiv.style.height = filtersForm.clientHeight + 'px';
}

// export const handleFiltersInput = (filter, type, value) => (dispatch) => {
//     dispatch(actionsHome.handleFiltersInput(filter, type, value));
// }

export const applyFilters = (filters) => (dispatch, getState) => {
    const stocks = getState().home.stocks;
    dispatch(actionsHome.applyFilters(filters));
    dispatch(getStocksSuccess(stocks.data));
}

export const getCurrencies = () => (dispatch, getState) => {
    const currencies = getState().home.currencies;
    if (currencies.data.length) {
        return;
    }
    dispatch(actionsHome.getCurrenciesRequest());
    fetch(util.urlCurrencies)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const convertedData = util.convertCurrenciesResponseToCurrencies(data);
            dispatch(actionsHome.getCurrenciesSuccess(convertedData));
        })
        .catch();
}

export const resetFilters = () => (dispatch) => {
    dispatch(actionsHome.resetFilters());
}
