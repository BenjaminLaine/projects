import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import clone from "clone";
import remove from "lodash.remove";

import StateContext from "../../context/StateContext";
import DispatchContext from '../../context/DispatchContext';

import Spinner from "../layout/Spinner";

import convertTime from "../functions/convertTime";

const MyNotifications = () =>
{
	const globalState = useContext(StateContext);
	const globalDispatch = useContext(DispatchContext);

	const [notifications, setNotifications] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() =>
	{
		(async () =>
		{
			try
			{
				globalDispatch({ type: "setMyNotifications", value: '0' });

				// fetch all users
				const users = await axios.get('http://localhost:5000/api/users/', globalState.config);

				// fetch all your notifications
				const response = await axios.get('http://localhost:5000/api/notifications/list/', globalState.config);

				await axios.put('http://localhost:5000/api/notifications/age/', {}, globalState.config);

				// remove blocked users
				for (let i = 0; i < response.data.length; i++)
				{
					let found = false;

					for (let j = 0; users.data[j]; j++)
					{
						if (response.data[i].sender === users.data[j].id)
							found = true;
					}
					if (!found)
					{
						response.data.splice(i, 1);
						i--;
					}
				}

				// add corresponding usernames and profile images to the list
				for (let i = 0; response.data[i]; i++)
				{
					for (let j = 0; users.data[j]; j++)
					{
						if (response.data[i].sender === users.data[j].id)
							response.data[i].username = users.data[j].username;
					}
				}
				setNotifications(response.data);
				setIsLoading(false);
			}
			catch (err)
			{
				console.error(err.message);
			}
		})()
	}, [globalState.user.username, globalState.config, globalState.myNotifications, globalDispatch]);

	const deleteNotification = async (id) =>
	{
		try
		{
			await axios.delete(`http://localhost:5000/api/notifications/${id}`, globalState.config);

			let notificationsNew = clone(notifications);
			notificationsNew = remove(notificationsNew, (data) => data.id !== id)
			setNotifications(notificationsNew);
		}
		catch (err)
		{
			console.error(err.message);
		}
	}

	const deleteAllNotifications = async () =>
	{
		try
		{
			await axios.delete(`http://localhost:5000/api/notifications/all/`, globalState.config);
			
			setNotifications([]);
		}
		catch (err)
		{
			console.error(err.message);
		}
	}

	return (
		<main>
			<div className="box border-dark clamp-700 m-a p-5">
				<h1 className="center"><i className="fas fa-bell color-dark mb-4"></i> My Notifications</h1>
				<table id="notifications">
					<tbody>

						{isLoading && (<tr><td><Spinner /></td></tr>)}

						{notifications.length > 0 && (
						<tr>
							<td width="100%">
									<div className="right">Delete all</div>
								</td>
							<td>
								<button className="button-trash" onClick={() => deleteAllNotifications(globalState.user.username)} title="Delete All">
									<i className="fas fa-trash-alt color-black100"></i>
								</button>
							</td>																		
						</tr>
						)}

						<tr>
							<td colSpan="4">
								<hr className="my-1"></hr>
							</td>
						</tr>

						{!isLoading && (notifications.map(row => (
							<Fragment key={row.id}>

								{row.type === 1 && (
								<tr>
									<td width="100%">
										{row.new ? <i className="fas fa-hand-spock color-info"></i> : <i className="fas fa-hand-spock color-light"></i>}
										<span> </span><Link to={"/profile/" + row.sender}>{row.username}</Link> visited your profile on {convertTime(row.created)}.
									</td>
									<td>
										<button className="button-trash" onClick={() => deleteNotification(row.id)} title="Delete">
											<i className="fas fa-trash-alt color-gray"></i>
										</button>
									</td>																		
								</tr>
								)}

								{row.type === 2 && (
								<tr>
									<td width="100%">
										{row.new ? <i className="fas fa-heart color-primary"></i> : <i className="fas fa-heart color-light"></i>}
										<span> </span><Link to={"/profile/" + row.sender}>{row.username}</Link> beeped you on {convertTime(row.created)}.
									</td>
									<td>
										<button className="button-trash" onClick={() => deleteNotification(row.id)} title="Delete">
											<i className="fas fa-trash-alt color-gray"></i>
										</button>
									</td>																		
								</tr>
								)}

								{row.type === 3 && (
								<tr>
									<td width="100%">
										{row.new ? <i className="fas fa-heart-broken color-pink"></i> : <i className="fas fa-heart-broken color-light"></i>}
										<span> </span><Link to={"/profile/" + row.sender}>{row.username}</Link><span className="color-pink"> unbeeped you on {convertTime(row.created)}.</span>
									</td>
									<td>
										<button className="button-trash" onClick={() => deleteNotification(row.id)} title="Delete">
											<i className="fas fa-trash-alt color-gray"></i>
										</button>
									</td>																		
								</tr>
								)}

								{row.type === 4 && (
								<tr>
									<td width="100%">
										{row.new ? <i className="fas fa-heart color-primary"></i> : <i className="fas fa-link color-light"></i>}
										<span> </span><Link to={"/profile/" + row.sender}>{row.username}</Link>
										<span className="color-info"> and <Link to={"/profile/" + row.recipient}>{globalState.user.username}</Link> are now connected!</span>
									</td>
									<td>
										<button className="button-trash" onClick={() => deleteNotification(row.id)} title="Delete">
											<i className="fas fa-trash-alt color-gray"></i>
										</button>
									</td>																		
								</tr>
								)}

								{row.type === 5 && (
								<tr>
									<td width="100%">
										{row.new ? <i className="fas fa-heart-broken color-pink"></i> : <i className="fas fa-unlink color-light"></i>}
										<span> </span>
										<span className="color-pink">connection between <Link to={"/profile/" + row.sender}>{row.username}</Link> and <Link to={"/profile/" + row.recipient}>{globalState.user.username}</Link> has been broken!</span>
									</td>
									<td>
										<button className="button-trash" onClick={() => deleteNotification(row.id)} title="Delete">
											<i className="fas fa-trash-alt color-gray"></i>
										</button>
									</td>																		
								</tr>
								)}

								<tr>
									<td colSpan="4">
										<hr className="my-1"></hr>
									</td>
								</tr>
							</Fragment>
						)))}
					</tbody>
				</table>
			</div>
		</main>
	)
}

export default MyNotifications;