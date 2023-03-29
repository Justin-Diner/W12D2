import csrfFetch from "./csrf";

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

export const setCurrentUser = (user) => ({
	type: SET_CURRENT_USER, 
	user
})


export const removeCurrentUser = () => ({
	type: REMOVE_CURRENT_USER, 
})

export const login = (user) => async (dispatch) => {
	const {credential, password } = user; 
	const response = await csrfFetch('/api/session', {
		method: 'POST',
		body: JSON.stringify({
			credential, 
			password
		})
	});

	if (response.ok) {
	const data = await response.json();
		dispatch(setCurrentUser(data.user));
	}
	return response; 
}

export const logout = (userId) => async (dispatch) => {
	const response = await csrfFetch(`/api/session/`, {
		method: "DELETE"
	})

	if (response.ok) {
		dispatch(removeCurrentUser())
	}
}

const initialState = {user: null}

const sessionReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER: 
			return {
				...state, 
				user: action.user 
			}
		case REMOVE_CURRENT_USER: 
			const newState = {...state, user: null}
			return newState;
		default: 
			return state;
	}
}

export default sessionReducer;