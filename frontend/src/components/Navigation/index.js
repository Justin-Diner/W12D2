import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Navigation = () => {
	let res;
	const currentUser = useSelector(state => state.session.user);

	if (currentUser) {
		res = <li><NavLink to='/'>Home</NavLink></li>
	} else {
		res = [
			<li><NavLink to='/login'>Login</NavLink></li>,
			<li><NavLink to='/signup'>Sign Up</NavLink></li>
		]
	}

	return (
		<ul>
			{res}
		</ul>
	)

}

export default Navigation;