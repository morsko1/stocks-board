import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import home from './home';
import chart from './chart';
import fullTable from './fullTable';
import register from './register';

export default combineReducers({
    router: routerReducer,
    home,
    chart,
    fullTable,
    register
});
