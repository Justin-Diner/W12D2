import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../store/session';
import { Redirect } from 'react-router-dom';

const SignUpForm = () => {
	const dispatch = useDispatch(); 
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const user = useSelector(state => state.session.user)

	if (user) {
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
		<form>
			<h1>Create an Account</h1>

			<label> Username <br/>
			<input type="text" onChange={(e)=> setUsername(e.target.value)} />
			</label>

			<label> Email
			<input type="text" onChange={(e)=> setEmail(e.target.value)}/>
			</label>

			<label> Password
			<input type="password" onChange={(e)=> setPassword(e.target.value)}/>
			</label>

			<label> Confirm Password
			<input type="password" onChange={(e)=> setConfirmPassword(e.target.value)}/>
			</label>

			<button onClick={handleClick}>Sign Up</button>

			<ul className="errors">
				{errors.map(error => {
					if (error.includes("do not match!")) {
						return <li>{error}</li>
					} else {
						return <li key={error}>{error}</li>
					}
				})}
			</ul>
			

		</form>
	)
}

export default SignUpForm;
