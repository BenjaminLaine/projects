import React, { useEffect, useState,useContext } from 'react';
import { Link, NavLink } from 'react-router-dom'
import StateContext from "../../context/StateContext";
import DispatchContext from '../../context/DispatchContext';
import GetNotificationsAndMessages from '../layout/GetNotificationsAndMessages';
import logo from'./logo.png';

const HeaderLoggedIn = () =>
{
	const globalState = useContext(StateContext);
	const globalDispatch = useContext(DispatchContext);

	const [conn, setConn] = useState();

	useEffect(() =>
	{
		(async () =>
		{
			try
			{
				let sse = await new EventSource(`http://localhost:5000/api/stream/${globalState.user.id}`);
				setConn(sse);
				sse.onmessage = (event) => {
					const data = event.data.split(",");
					globalDispatch({ type: "setMyNotifications", value: data[0] });
					globalDispatch({ type: "setMyMessages", value: data[1] });
				};
			}
			catch (err)
			{
				console.error(err.message);
			}
		})()
	}, [globalState.user.id, globalDispatch]);

	const handleLogout = async () =>
	{
		globalDispatch({ type: "closeChat" });
		globalDispatch({ type: "logout" });
		localStorage.removeItem("BeeTogetherToken");
		localStorage.removeItem("BeeTogetherId");
		localStorage.removeItem("BeeTogetherUsername");
		localStorage.removeItem("BeeTogetherProfileImage");
		localStorage.removeItem("BeeTogetherIsAdmin");
		let sse = conn;
		sse.close();
		globalDispatch({ type: "successMessage", value: "Successfully logged out." });
	}
	
	return (
		<header className="mb-2">
			<nav className='navbar'>
				<div className="flex" style={{ width: '100%' }}>
					<div className="navbar-title">
						<Link to='/home' alt='Home' title='Home'>
							<img src={logo} alt='logo' className='logo'/><span> </span>
						</Link>
						<NavLink to='/home' alt='Home' title='Home'>
							BeeTogether
						</NavLink>
					</div>
					<div>
						<ul>
							<li>
								<NavLink to='/lovesearch' alt='LoveSearch™' title='LoveSearch™'>
									<i className="fas fa-heart color-primary"></i> LoveSearch™
								</NavLink>
							</li>
							<li>
								<NavLink to='/about' alt='About' title='About'>
									<i className="fas fa-info-circle color-primary"></i> About
								</NavLink>
							</li>
							<li>
								<NavLink to='/map' alt='Map' title='Map'>
									<i className="fas fa-globe-americas color-primary"></i> Map
								</NavLink>
							</li>
						</ul>
					</div>
					<div>
						<ul>
							<GetNotificationsAndMessages />
							<li>
								<Link to={`/profile/${globalState.user.id}`} alt='Profile' title='Profile'>
									<img className="profile-img" src={globalState.user.profileImage} alt='Profile'/>
								</Link>
								<NavLink to={`/profile/${globalState.user.id}`} alt='Profile' title='Profile'>
									<span> </span>Profile
								</NavLink>
							</li>
							{globalState.user.isAdmin === 'true' && (
								<li>
									<NavLink to='/admin' alt='Admin' title='Admin'>
										<i className="fas fa-user-lock color-primary"></i>
									</NavLink>
								</li>
							)}
							<li>
								<Link to='#' alt='Logout' title='Logout'>
									<span onClick={handleLogout}><i className="fas fa-share-square color-primary"></i> Logout</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	)
}

export default HeaderLoggedIn;
