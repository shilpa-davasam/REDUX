import React, {Component} from 'react';
import PropTypes from 'prop-types';

//import components


//import css
import '../css/filters.css';

class SelectedFilters extends Component{
  
  
  static propTypes = {
		filters: PropTypes.array
	}
  
  render(){
	  const {filters} = this.props;
	  let filterList;
	  
	  //list the filters in display mode
	  if(filters.length){
		  filterList = filters.map((obj, index) => {
			 if(obj.operator && (obj.value)){
				return <span key={index} className="display-query">{obj.subject} {obj.operator} {obj.value}</span>;
			}
			else return null;
		});
	  }
	  else{
		  filterList = (<span>None Selected</span>);
	  }
	  
	  
    return(
      <div className="search panel">
		<div className="panel-heading">Selected Filters</div>
		<div className="panel-body">{filterList}</div>
	  </div>
    )
  }
}
export default SelectedFilters;