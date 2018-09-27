import * as actionsRegister from '../../actions/register';

export const test = () => (dispatch) => {
    dispatch(actionsRegister.test());
}
