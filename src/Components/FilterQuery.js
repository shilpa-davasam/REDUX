import React, {Component} from 'react';
import PropTypes from 'prop-types';

//import components


//import css
import '../css/filters.css';

class FilterQuery extends Component{
  
  
  operatorRef = React.createRef();
  valueRef = React.createRef();

  state = {
    validationError: ""
  }
  
  static propTypes = {
		updateFilters: PropTypes.func,
		index: PropTypes.number,
		subject: PropTypes.string,
		deleteFilter: PropTypes.func
	}
	
	//function to update filter obj
	updateFilterObj = (value) => {
		const {subject, updateFilters, index} = this.props;
		const obj = {
		  subject, 
		  operator: this.operatorRef.current.value, 
		  value,
		}
		updateFilters(index, obj);
	}
	
	//validation function for checking the value
  validate = (e) => {
      const {valueRef} = this;
	  switch(true){
		  case (!valueRef.current.value) : 
				this.setState({validationError: "Please enter a value"});
				this.updateFilterObj("");
				break;
      
		  case (valueRef.current.value > 100):
			  this.setState({validationError: "Please enter a value less than or equal to 100"});
				this.updateFilterObj("");
				break;
		  case (valueRef.current.value < 0):
			  this.setState({validationError: "Please enter a value greater than 0"});
				 this.updateFilterObj("");
				break;
		  default : 
			this.setState({validationError: ""});
			this.updateFilterObj(this.valueRef.current.value);
			break;
	  }
  }

  //function to delete filter
  handleDelete = (e) => {
	  this.props.deleteFilter(this.props.index);
  }
  
  render(){
	  const { validate , props: {subject}, state: {validationError}, valueRef, handleDelete} = this;
    let status;
    if(validationError){
      status = (
        <span className="warning-message">{validationError}</span>
      )
    }
     return(
      <div>
        <label>{subject.toUpperCase()}</label>
        <select className="btn operator-select" ref={this.operatorRef}>
          <option value='EQUAL_TO'> Equal To </option>
          <option value='GREATER_THAN'> Greater Than </option>
          <option value='LESSER_THAN'> Lesser Than </option>
        </select>
        <input type="number" className="form-control value-input" ref={valueRef} onChange={validate}/>
		<span className="delete-selection" title="Delete" onClick={handleDelete}>x</span>
        {status}
      </div>
    )
  }
}
export default FilterQuery;