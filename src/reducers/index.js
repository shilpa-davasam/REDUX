import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

//combining all the reducers
import loginCred from './login';
import filters from './filters';

const rootReducer = combineReducers({loginCred, filters, routing: routerReducer });

export default rootReducer;