import React, {Component} from 'react';


//import css
import '../css/filters.css';

class DisplayResults extends Component{
  
  render(){
	  
    return(
      <div className="search panel">
		<div className="panel-heading">Show Results</div>
		<div className="panel-body">No Results</div>
	  </div>
    )
  }
}
export default DisplayResults;