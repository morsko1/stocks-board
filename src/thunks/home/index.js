import * as actionsHome from '../../actions/home';
import * as util from '../../common/util';

export const getStocks = () => dispatch => {
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

            const convertedData = util.convertStocksResponseToStocks(data);

            dispatch(actionsHome.getStocksSuccess(convertedData));
        })
        .catch(
            error => dispatch(actionsHome.getStocksFailure(error))
        );
};
