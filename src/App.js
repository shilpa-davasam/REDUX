import React from 'react';

//import css
import './App.css';

// Import Components
import {Login} from './Components/Login';
import {Filters} from './Components/Filters';
import NotFound from './Components/NotFound';

// import react router deps
import { BrowserRouter, Route, Switch  } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
  <Provider store={store}>
    <BrowserRouter> 
		<Switch>
			<Route exact path="/" component={Login}/>
			<Route exact path="/filters" component={Filters} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
	</Provider>
  );
}

export default App;
