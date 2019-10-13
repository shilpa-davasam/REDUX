// login action
export function login(userName, password) {
  return {
    type: 'LOGIN',
    userName,
	password
  }
}

// add filters actions
export function addFilters(data) {
  return {
    type: 'ADD_FILTERS',
    filters: [...data]
  }
}

