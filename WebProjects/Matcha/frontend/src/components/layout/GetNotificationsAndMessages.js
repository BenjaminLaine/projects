import React, { Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom'

import StateContext from "../../context/StateContext";

const GetNotificationsAndMessages = () =>
{
	const globalState = useContext(StateContext);

	return (
		<Fragment>
			<li>
				<NavLink to='/mynotifications/' alt='My Notifications' title='My Notifications'>
					<i className={globalState.myNotifications === 0 ? "fas fa-bell color-primary" : "fas fa-bell color-pink"}></i> {globalState.myNotifications}
				</NavLink>
			</li>
			<li>
				<NavLink to='/mymessages/' alt='My Messages' title='My Messages'>
				<i className={globalState.myMessages === 0 ? "fas fa-envelope color-primary" : "fas fa-envelope color-pink"}></i> {globalState.myMessages}
				</NavLink>
			</li>
		</Fragment>
	)
}

export default GetNotificationsAndMessages;