import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import home from './Home/reducers';
import stockPage from './StockPage/reducers';
import fullTable from './FullTable/reducers';
import user from './User/reducers';
import register from './Register/reducers';
import login from './Login/reducers';

export default combineReducers({
    router: routerReducer,
    home,
    stockPage,
    fullTable,
    user,
    register,
    login
});
