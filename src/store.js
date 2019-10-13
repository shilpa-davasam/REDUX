import { createStore} from 'redux';

// import the root reducer
import rootReducer from './reducers/index';


// create an object for the default data
const defaultState = {
	loginCred:{
		userName:'',
		password:''
	},
	filters:[]
};

const store = createStore(rootReducer, defaultState);

if(module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;