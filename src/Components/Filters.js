import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionCreators from '../actions/actionCreators';
import PropTypes from 'prop-types';

//import components
import Search from './Search';
import ValueSelection from './ValueSelection';
import SelectedFilters from './SelectedFilters';
import DisplayResults from './DisplayResults';
import ErrorBoundary from './ErrorBoundary';


//import css
import '../css/filters.css';

class Filters extends React.Component{
	constructor(props){
		super(props);
		this.state = {
		  marks: [],
		  error: null,
		  isLoaded: false,
		  selectedOption: "",
		  selectedFilters: []
		}
	  }
	  
	  static propTypes = {
		addFilters: PropTypes.func
	}
	  
	componentDidMount(){
	    axios.get(`../Marks.json`)
		.then(res => {
			console.log(res);
			const marks = res.data;
			this.setState({marks, isLoaded: true});
		})
		.catch(err => {
			this.setState({
				isLoaded: true,
				error: err
			});
			console.log(err);
		});
      
	}
	//function to update selected option
	updateSelectedOption = (option) => {
		console.log(option);
		const selectedFilters = [...this.state.selectedFilters];
		if(selectedFilters.length){
			const addedFilter = selectedFilters.filter((obj) => obj.subject === option);
			if(addedFilter.length >= 1){
				return true;
			}
		}
		selectedFilters.push({
		  subject: option,
		  operator: '',
		  value: null
		});
		this.setState({selectedOption: option, selectedFilters});
    }
	//function to update selected filters array
	updateFilters = (index, obj) => {
	  const selectedFilters = [...this.state.selectedFilters];
	  selectedFilters[index] = obj;
	  this.setState({selectedFilters});
	  console.log(this.state.selectedFilters);
	}
	//function to delete filter
	deleteFilter = (index) => {
		const selectedFilters = [...this.state.selectedFilters];
		selectedFilters.splice(index, 1);
		this.setState({selectedFilters});
	}
	//function called on click of submit
	//update filters in store and insert in DB
	storeFilters = () => {
		if(this.state.selectedFilters.length){
			this.props.addFilters(this.state.selectedFilters);
			axios.post('http://localhost:3001/api/filters', {query: JSON.stringify(this.state.selectedFilters)})
			 .then(res => {
				console.log(res);
			 })
			 .catch(err => {
			 console.error(err);
			 });
		}
	}
	//function to disable continue if no valid selections
	disableContinue = () => {
		const {selectedFilters} = this.state;
		let disableFlag = true;
		if(selectedFilters.length){
			disableFlag = selectedFilters.some((obj) => !obj.value);
		}
		return disableFlag;
	}
	render(){
		const {state: {marks, isLoaded, error, selectedFilters}, 
						updateSelectedOption, updateFilters, storeFilters,disableContinue, deleteFilter} = this;
	  if(error){
		  return <div>Error: {error.message}</div>
	  }
	  else if(!isLoaded){
		  return <div><img src="../loading.png" alt="Loading..."/></div>
	  }
	  else{
		  return(
			  <div className="filters">
				<ErrorBoundary>
					<Search marks={marks} updateSelectedOption={updateSelectedOption}/>
					<ValueSelection {...this.state} updateFilters={updateFilters} deleteFilter={deleteFilter} />
					<SelectedFilters filters={selectedFilters}/>
					<button className="btn submit" disabled={disableContinue()} onClick={storeFilters}> CONTINUE </button>
					<DisplayResults />
				</ErrorBoundary>
			  </div>
			)
	  }
		
	}
}

//connect component to store
function mapStateToProps(state) {
  return {
    loginCred:state.loginCred,
	filters:state.filters
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const connectedFilterPage = connect(mapStateToProps, mapDispatchToProps)(Filters);
export { connectedFilterPage as Filters };