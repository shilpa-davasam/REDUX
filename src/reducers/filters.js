//reducer to store the filters selected

function filters(state = [], action) {
  switch(action.type) {
    case 'ADD_FILTERS' :
      console.log("ADD_FILTERS");
	  const newState = [...action.filters];
	  return newState;
    default:
      return state;
  }
}

export default filters;