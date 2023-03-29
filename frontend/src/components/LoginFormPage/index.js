import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";

const LoginFormPage = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault(); 
		setErrors([]);

		const user = {
			credential: credential,
			password: password
		}

		return dispatch(login(user))
			.catch(async (res) => {
				let data; 
				try {
					data = await res.clone().json();
				} catch {
					data = await res.text();
				}
				if (data?.errors) setErrors(data.errors);
				else if (data) setErrors([data]);
				else setErrors([res.statusText]);
			});
	}

	return (
		<form onSubmit={handleSubmit}>
			<ul> 
				{errors.map(error => <li key={error}>{error}</li>)}
			</ul>
			<label> Username or Email
				<input type="text" value={credential}  onChange={(e) => setCredential(e.currentTarget.value)} required/>
			</label>

			<label> Password
				<input type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)}/>
			</label>
			<input type="submit" value="Submit" />
		</form>
	)
}

export default LoginFormPage;