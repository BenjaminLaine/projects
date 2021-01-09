import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import clone from "clone";
import remove from "lodash.remove";

import StateContext from "../../context/StateContext";
import DispatchContext from '../../context/DispatchContext';

import Spinner from "../layout/Spinner";

import convertTime from "../functions/convertTime";

const MyMessages = () =>
{
	const globalState = useContext(StateContext);
	const globalDispatch = useContext(DispatchContext);

	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() =>
	{
		(async () =>
		{
			try
			{
				globalDispatch({ type: "setMyMessages", value: '0' });

				// fetch all users
				const users = await axios.get('http://localhost:5000/api/users/', globalState.config);

				// fetch all your messages
				let response = await axios.get('http://localhost:5000/api/messages/list/', globalState.config);

				await axios.put('http://localhost:5000/api/messages/age/', {}, globalState.config);

				// remove blocked users
				for (let i = 0; response.data[i]; i++)
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
						{
							response.data[i].username = users.data[j].username;
							response.data[i].profile_image = users.data[j].profile_image;
						}
					}
				}
				
				setMessages(response.data);
				setIsLoading(false);
			}
			catch (err)
			{
				console.error(err.message);
			}
		})();
	}, [globalState.user.id, globalState.config, globalState.myMessages, globalDispatch]);

	const deleteMessage = async (id) =>
	{
		try
		{
			await axios.delete(`http://localhost:5000/api/messages/${id}`, globalState.config);
			
			let messagesNew = clone(messages);
			messagesNew = remove(messagesNew, (data) => data.id !== id)
			setMessages(messagesNew);
		}
		catch (err)
		{
			console.error(err.message);
		}
	}

	const deleteAllMessages = async () =>
	{
		try
		{
			await axios.delete(`http://localhost:5000/api/messages/all/`, globalState.config);

			setMessages([]);
		}
		catch (err)
		{
			console.error(err.message);
		}
	}

	return (
		<main>
			<div className="ram-container px-2">
				<div className="ram">
					<div className="box border-dark p-5">
						<h1 className="center"><i className="fas fa-comment-dots color-dark mb-4"></i> My Messages</h1>
						<table id="messages">
							<tbody>

								{isLoading && (<tr><td><Spinner /></td></tr>)}

								{messages.length > 0 && (
								<tr>
									<td  colSpan="3" width="100%">
										<div className="right">Delete all</div>
									</td>
									<td>
										<button className="button-trash" onClick={() => deleteAllMessages()} title="Delete All">
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

							{!isLoading && messages.map(row => (
								<Fragment key={row.id}>
									<tr>
										<td rowSpan="2">
											<Link to={`../profile/${row.sender}`}>
												<img className="chat-img" src={row.profile_image} alt='Profile'/>
											</Link>
										</td>
										<td className="message-username">
											<Link to={`../profile/${row.sender}`}>
												{row.username}
											</Link>
										</td>
										<td width="100%" className="message-date">{convertTime(row.created)}</td>
										<td rowSpan="2">
											<button className="button-trash" onClick={() => deleteMessage(row.id)} title="Delete">
												<i className="fas fa-trash-alt color-gray"></i>
											</button>
										</td>
									</tr>
									<tr>
										<td colSpan="2" style={{overflowWrap: "anywhere"}}>
											{row.msg}
										</td>
									</tr>
									<tr>
										<td colSpan="4">
											<hr className="my-1"></hr>
										</td>
									</tr>
								</Fragment>
								)
							)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</main>
	)
}

export default MyMessages;

// className="message-date">