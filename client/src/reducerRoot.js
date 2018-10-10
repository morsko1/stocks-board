import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import home from './Home/reducers';
import chart from './Chart/reducers';
import fullTable from './FullTable/reducers';
import register from './Register/reducers';

export default combineReducers({
    router: routerReducer,
    home,
    chart,
    fullTable,
    register
});
