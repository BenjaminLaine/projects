// React
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';

// Context
import StateContext from './context/StateContext';
import DispatchContext from './context/DispatchContext';

// Components
import HeaderLoggedIn from './components/layout/HeaderLoggedIn';
import HeaderLoggedOut from './components/layout/HeaderLoggedOut';
import Footer from './components/layout/Footer';
import SuccessMessage from './components/layout/SuccessMessage';
import ErrorMessage from './components/layout/ErrorMessage';
import Home from './components/pages/Home';
import LoveSearch from './components/pages/LoveSearch';
import About from './components/pages/About';
import Admin from './components/pages/Admin';
import MyNotifications from './components/pages/MyNotifications';
import MyMessages from './components/pages/MyMessages';
import Profile from './components/pages/Profile';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import ActivationSent from './components/pages/ActivationSent';
import Activation from './components/pages/Activation';
import ForgotPassword from './components/pages/ForgotPassword';
import NewPassword from './components/pages/NewPassword';
import Chat from "./components/pages/utilities/Chat";
import Map from "./components/pages/Map";

// CSS
import './css/main.css';

const App = () =>
{
	const initialState = {
		loggedIn: Boolean(localStorage.getItem('BeeTogetherToken')),
		user: {
			token: localStorage.getItem("BeeTogetherToken"),
			username: localStorage.getItem("BeeTogetherUsername"),
			id: localStorage.getItem("BeeTogetherId"),
			profileImage: localStorage.getItem("BeeTogetherProfileImage"),
			isAdmin: localStorage.getItem("BeeTogetherIsAdmin")
		},
		config: {
			headers: {
				'Authorization': "Bearer " + localStorage.getItem("BeeTogetherToken")
			},
		},
		successMessage: [],
		errorMessage: [],
		chatOpen: false,
		chatWith: 1,
		myNotifications: 0,
		myMessages: 0
	};

	function ourReducer(draft, action)
	{
		switch (action.type)
		{
			case "login":
				draft.loggedIn = true;
				draft.user.token = localStorage.getItem("BeeTogetherToken");
				draft.user.username = localStorage.getItem("BeeTogetherUsername");
				draft.user.id = localStorage.getItem("BeeTogetherId");
				draft.user.profileImage = localStorage.getItem("BeeTogetherProfileImage");
				draft.isAdmin = localStorage.getItem("BeeTogetherIsAdmin");
				draft.config = {
					headers: {
						'Authorization': "Bearer " + localStorage.getItem("BeeTogetherToken")
					},
				};
				return;
			case "logout":
				draft.loggedIn = false;
				return;
			case "successMessage":
				draft.successMessage.push(action.value);
				return;
			case "errorMessage":
				draft.errorMessage.push(action.value);
				return;
			case "openChat":
				draft.chatOpen = true;
				draft.chatWith = action.value;
				return;
			case "closeChat":
				draft.chatOpen = false;
				return;
			case "changeProfileImage":
				draft.user.profileImage = action.value;
				localStorage.setItem("BeeTogetherProfileImage", action.value);
				draft.successMessage.push("Profile image changed");
				return;
			case "setMyNotifications":
				draft.myNotifications = Number(action.value);
				return;
			case "setMyMessages":
				draft.myMessages = Number(action.value);
				return;
			default:
				// nothing
		}
	}

	const [state, dispatch] = useImmerReducer(ourReducer, initialState);

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<BrowserRouter>
					<SuccessMessage messages={state.successMessage} />
					<ErrorMessage messages={state.errorMessage} />
					{initialState.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
					<Switch>
						<Route exact path='/home' component={initialState.loggedIn ? Home : Login} />
						<Route exact path='/lovesearch' component={initialState.loggedIn ? LoveSearch : Login} />
						<Route exact path='/about' component={About} />
						<Route exact path='/map' component={initialState.loggedIn ? Map : Login} />
						<Route exact path='/mynotifications' component={initialState.loggedIn ? MyNotifications : Login} />
						<Route exact path='/mymessages' component={initialState.loggedIn ? MyMessages : Login} />
						<Route exact path='/profile/:id' component={initialState.loggedIn ? Profile : Login} />
						<Route exact path='/admin' component={initialState.loggedIn ? Admin : Login} />
						<Route exact path='/login' component={initialState.loggedIn ? Home : Login} />
						<Route exact path='/register' component={initialState.loggedIn ? Home : Register} />
						<Route exact path='/activationsent' component={ActivationSent}/>
						<Route exact path='/newpassword/:token' component={NewPassword}/>
						<Route exact path='/forgotpassword' component={ForgotPassword}/>
						<Route exact path='/activation/:key' component={Activation}/>
						{initialState.loggedIn ? <Redirect to='/home'/> : <Redirect to='/login'/>}
					</Switch>
					{initialState.loggedIn && <Chat />}
					<Footer />
				</BrowserRouter>
			</DispatchContext.Provider>
		</StateContext.Provider>
	);
}

export default App;