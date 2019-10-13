import React, {Component} from 'react';
import PropTypes from 'prop-types';

//import components
import FilterQuery from './FilterQuery';


//import css
import '../css/filters.css';

class ValueSelection extends Component{
  
  
  static propTypes = {
		selectedFilters: PropTypes.array,
		updateFilters: PropTypes.func,
		deleteFilter: PropTypes.func
	}
  
  render(){
	 const { selectedFilters, updateFilters, deleteFilter } = this.props;
		let filterList;
		if(selectedFilters.length){
			//FilterQuery component for adding values
		  filterList = (
				selectedFilters.map((obj, index) => {
				  return <FilterQuery key={index} index={index} {...obj} updateFilters={updateFilters} 
							deleteFilter={deleteFilter}/>
				})
		  )
		}
		else{
		  filterList = (
			<span>No Filters Selected</span>
		  )
		}
    return(
      <div className="search panel">
		<div className="panel-heading">Filter Value Selection </div>
		<div className="panel-body">{filterList}</div>
	  </div>
    )
  }
}
export default ValueSelection;