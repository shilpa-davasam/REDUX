import React, {Component} from 'react';
import PropTypes from 'prop-types';

//import components
import TypeAhead from './TypeAhead';

//import css
import '../css/filters.css';

class Search extends Component{
	static propTypes = {
		marks: PropTypes.array.isRequired
	}
  
  render(){
	  const [id, name, ...subjects] = Object.keys(this.props.marks[0]);
	  console.log(subjects);
	  //typeahead for searching 
    return(
      <div className="search panel">
		<div className="panel-heading">Filter Search </div>
		<div className="panel-body">
			<TypeAhead options={subjects} updateSelectedOption={this.props.updateSelectedOption}/>
		</div>
	  </div>
    )
  }
}
export default Search;