import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../store/session';
import { Redirect } from 'react-router-dom';
import './SignupForm.css'


const SignUpForm = () => {
	const dispatch = useDispatch(); 
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const sessionUser = useSelector(state => state.session.user)

	if (sessionUser) {
		return <Redirect to="/" />
	}

	const handleClick = (e) => {
		e.preventDefault(); 
		const newUser = {
			username: username,
			email: email 
		}
		if (password === confirmPassword) {
			newUser.password = password; 
		} else {
			return setErrors(["Passwords do not match!"])
		}

		setErrors([]);

		return dispatch(signup(newUser))
			.catch(async (res) => {
				let data; 
				
				try {
					data = await res.clone().json();
				} catch {
					data = await res.text();
				}
				const allErrors = data.map(error => error)
				if (data?.errors) setErrors(allErrors);
				else if (data) setErrors(allErrors);
				else setErrors([res.statusText])
			});
	}

	return (
		<form id="signup_form" > 
			<h1 className="signup_option">Create an Account</h1>

			<label className="signup_option"> Username
			<input  type="text" onChange={(e)=> setUsername(e.target.value)} />
			</label>

			<label className="signup_option"> Email
			<input  type="text" onChange={(e)=> setEmail(e.target.value)}/>
			</label>

			<label className="signup_option"> Password
			<input  type="password" onChange={(e)=> setPassword(e.target.value)}/>
			</label>

			<label className="signup_option"> Confirm Password
			<input  type="password" onChange={(e)=> setConfirmPassword(e.target.value)}/>
			</label>

			<button id="signup_button" className="signup_option" onClick={handleClick}>Sign Up</button>

			<ul >
				{errors.map(error => {
					if (error.includes("do not match!")) {
						return <li className="errors">{error}</li>
					} else {
						return <li className="errors" key={error}>{error}</li>
					}
				})}
			</ul>
			

		</form>
	)
}

export default SignUpForm;
