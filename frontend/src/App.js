import React from 'react';
import { Route, Switch} from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignUpForm from './components/SignupFormPage';

function App() {
  return (
    <Switch>
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
