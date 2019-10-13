//reducer to store the login credentials

function loginCred(state = [], action) {
  switch(action.type) {
    case 'LOGIN' :
      console.log("LOGIN");
	  const {userName, password } = {...action};
	  const newState = {...state, userName, password};
	  return newState;
    default:
      return state;
  }
}

export default loginCred;