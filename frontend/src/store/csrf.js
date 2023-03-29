export function storeCSRFToken(response) {
	const csrfToken = response.headers.get("X-CSRF-Token");
	if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken)
}

export async function restoreCSRF() {
	const response = await csrfFetch("/api/session")
	storeCSRFToken(response);
	return response; 
}

async function csrfFetch(url, options = {}) {
	options.method ||= 'GET';
	options.headers ||= {};

	if (options.method.toUpperCase() !== 'GET') {
		options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
		// Here you are assuming a session token has been set. To ensure this, you need to set one before loading application (above function). 
		options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
	}
	
	const res = await fetch(url, options);
	
	if (res.status >= 400) throw res; 
	return res; 
}

export default csrfFetch; 