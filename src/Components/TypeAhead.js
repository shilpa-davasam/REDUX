import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import css
import '../App.css';

class TypeAhead extends Component{
	static propTypes = {
		options: PropTypes.instanceOf(Array).isRequired
	}
	state = {
		userInput: '',
		filteredOptions: [],
		activeOption: 0,
		showList: false,
		status:''
	}
	
	//function to detect change in text box
	onChange = (e) => {
		console.log('onChange');
		const {options} = this.props;
		const userInput = e.currentTarget.value;
		
		const filteredOptions = options.filter(
			(name) => name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
		);
		this.setState({
			userInput,
			filteredOptions,
			activeOption: 0,
			showList: true
		})
	}
	//function to capture keydown value
	onKeyDown = (e) => {
		const { activeOption, filteredOptions} = this.state;
		if(e.keyCode === 13){
			this.setState({
				activeOption: 0,
				userInput: filteredOptions[activeOption],
				showList: false,
				status: ""
			});
		}
		else if(e.keyCode === 38){
			if(activeOption === 0){
				return;
			}
			this.setState({activeOption: activeOption - 1})
		}
		else if(e.keyCode === 40){
			if(activeOption === filteredOptions.length - 1){
				return;
			}
			this.setState({activeOption: activeOption + 1});
		}
	}
	//function called on click of option
	onClick = (e) => {
		this.setState({
		  activeOption: 0,
		  filteredOptions: [],
		  showList: false,
		  userInput: e.currentTarget.innerText,
		  status: ''
		});
	};
	//function for adding selected option 
	onAddClick = () => {
		const { userInput } = this.state;
		if(userInput){
			const val = this.props.updateSelectedOption(userInput);
			if(val){
				this.setState({status: "Filter already exists!"});
			}
			else{
				this.setState({status: "", userInput: ""});
			}
		}
	}
	//function to reset the selected option
	onRefresh = () => {
		this.setState({
		  userInput: "",
		  status: ""
		});
	}
	
	render(){
		const { onChange, onClick, onKeyDown, onAddClick, onRefresh, state: {  userInput, filteredOptions, activeOption, showList, status }} = this;
		let optionList, error;
		if(status){
			error = (<span className="error">{status}</span>);
		}
		if(showList && userInput){
			if(filteredOptions.length){
				optionList = (
					<div className="dropdown-menu">
					{filteredOptions.map((name, index) => {
						/*let className;
						if(index === activeOption){
							className = "option-active";
						}*/
						return(
							<a className={`dropdown-item ${index === activeOption ? 'option-active' : '' }`} key={name} onClick={onClick}>
								{name}
							</a>
						)
					})}
					</div>
				)
			}
		}
		return(
			<React.Fragment>
				<div className="Search">
					<img src="../search-icon.png" className="search-icon" alt="Search"/>
					<input 
						type="text"
						className="form-control search-input"
						onChange={onChange}
						onKeyDown={onKeyDown}
						value={userInput}
						placeholder="Filter Search"
					/>
					<div style={{display:'inline'}}>
						<button className={`btn ${userInput ? 'pointer': 'no-drop' }`} disabled={!userInput} onClick={onAddClick} title="Add Filter">Add</button>
						<img src="../refresh.png" className="refresh-icon" onClick={onRefresh} title="Reset" alt="Reset"/>
					</div>
				</div>
				{optionList}
					{error}
			</React.Fragment>
		)
	}
}

export default TypeAhead;