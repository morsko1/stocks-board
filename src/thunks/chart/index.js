import * as actionsChart from '../../actions/chart';

export const setCurrentTicker = () => (dispatch, getState) => {
    const pathname = getState().router.location.pathname;
    const ticker = pathname.slice(pathname.lastIndexOf('/') + 1);
    dispatch(actionsChart.setCurrentTicker(ticker));
}
