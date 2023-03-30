import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { signup } from '../../store/session';

const SignUpForm = () => {
	const dispatch = useDispatch(); 
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

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
					data = await res.clone().json;
				} catch {
					data = await res.text();
				}
				if (data?.errors) setErrors(data.errors);
				else if (data) setErrors([data]);
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
					console.log(error)
					if (error.includes("do not match!")) {
						return <li>{error}</li>
					} else {
						const errorText = error.slice(12, error.length - 2)
						return <li key={error}>{errorText}</li>
					}
				})}
			</ul>
			

		</form>
	)
}

export default SignUpForm;
