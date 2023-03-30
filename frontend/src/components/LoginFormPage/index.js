import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import './LoginForm.css'
import { Redirect } from 'react-router-dom';

const LoginFormPage = () => {
	const dispatch = useDispatch(); 
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const sessionUser = useSelector(state => state.session.user);

	if (sessionUser) {
		return <Redirect to="/" />
	} 

	function handleClick(e) {
		e.preventDefault(); 

		const user = {
			credential: credential, 
			password: password
		}

		setErrors([]);

		return dispatch(login(user))
			.catch(async (res) => {
				let data; 
				try {
					data = await res.clonse().json;
				} catch {
					data = await res.text(); 
				}
				if (data?.errors) setErrors(data.errors);
				else if (data) setErrors([data]);
				else setErrors([res.statusText]);
			});
	}

	return (
		<form id="login_form">
			<h1>Please Log In</h1> 
			<label> 
				<input id="login_credential" placeholder="Username or Email" type="text" onChange={(e) => setCredential(e.target.value)} />
			</label>
			<br/>
			<label>  <br/>
				<input id="login_password" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
			</label>
			<br/>
			<br/>
			<button id="login_button" onClick={handleClick}>Log In</button>
			<ul className="errors">
				{errors.map(error => {
					const errorText = error.slice(12, error.length - 2)
					return <li key={error}>{errorText}</li>})
				}
			</ul>
		</form>
	)
}

export default LoginFormPage;