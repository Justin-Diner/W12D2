import React from 'react';
import { Route, Switch} from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignUpForm from './components/SignupFormPage';
import Navigation from './components/Navigation';

function App() {
  return (
    <Switch>
			<Route exact path='/'>
				<Navigation/>
			</Route>
			<Route exact path="/signup" > 
				<SignUpForm/>
			</Route>
			<Route exact path="/login" >
				<LoginFormPage />
			</Route>
		</Switch>
  );
}

export default App;
