import React, { useState, useEffect, useContext, Fragment } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";

import StateContext from "../../../context/StateContext";
import DispatchContext from "../../../context/DispatchContext";

function Chat()
{
	const globalDispatch = useContext(DispatchContext);
	const globalState = useContext(StateContext);

	const [chatMessages, setChatMessages] = useState([]);
	const [message, setMessage] = useState("");
	const [otherUserName, setOtherUserName] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() =>
	{
		(async () =>
		{
			try
			{
				let response = await axios.get(`http://localhost:5000/api/messages/chat/${globalState.chatWith}`, globalState.config);

				// fetch other user profile image
				if (globalState.chatWith !== 1)
				{
					let otherUser = await axios.get(`http://localhost:5000/api/users/profile/${globalState.chatWith}`);

					setOtherUserName(otherUser.data.username);

					for (let i = 0; i < response.data.length; i++)
					{
						if (response.data[i].sender !== globalState.user.id)
							response.data[i].profile_image = otherUser.data.profile_image;
					}
				}
				setChatMessages(response.data);
				setIsLoading(false);
			}
			catch (err)
			{
				console.log(err.message)
			}
		})()
	}, [globalState.user.id, globalState.chatOpen, globalState.chatWith, globalState.config, globalState.myMessages]);

	const changeMessage = (event) =>
	{
		if (message.length < 300)
			setMessage(event.target.value)
	}

	const handleSubmit = async (event) =>
	{
		event.preventDefault();

		if (message !== "")
		{
			try
			{	
				await axios.post('http://localhost:5000/api/messages/send/', {recipient: globalState.chatWith, msg: message}, globalState.config);

				let response = await axios.get(`http://localhost:5000/api/messages/chat/${globalState.chatWith}`, globalState.config);

				let otherUser = await axios.get(`http://localhost:5000/api/users/profile/${globalState.chatWith}`);

				setOtherUserName(otherUser.data.username);

				for (let i = 0; i < response.data.length; i++)
				{
					if (response.data[i].sender !== globalState.user.id)
						response.data[i].profile_image = otherUser.data.profile_image;
				}

				setChatMessages(response.data);
				setMessage("");
			}
			catch (err)
			{
				console.error(err.message);
			}
		}
	}
	return (
		<div className={"chat-wrapper shadow border-top border-left border-right " + (globalState.chatOpen ? "chat-wrapper--is-visible" : "")}>
			<div className="chat-title-bar">
	<div><i className="fas fa-comment-dots"></i> Chat with {otherUserName}</div>
				<div onClick={() => globalDispatch({ type: "closeChat" })} className="chat-title-bar-close"><i className="fas fa-times-circle"></i></div>
			</div>
			<div className="chat-log">

				{isLoading && (<div>Loading...</div>)}

				{!isLoading && (
					chatMessages.map(row =>
						<Fragment key={row.id}>
							{row.sender === globalState.chatWith ?
							<div className="chat-other-message">
								<Link to={`../profile/${row.sender}`}>
									<img className="chat-img" src={row.profile_image} alt="Chat Avatar"/>
								</Link>
								<div className="chat-other-message-text">{row.msg}</div>
							</div> :
							<div className="chat-my-message">
								<div className="chat-my-message-text">{row.msg}</div>
								<img className="chat-img" src={globalState.user.profileImage} alt="Chat Avatar"/>
							</div>}
						</Fragment>
					)
				)}
			</div>
			<form className="chat-input" onSubmit={handleSubmit}>
				<input type="text" className="chat-input" id="chatInput" placeholder="Say something…" autoComplete="off" onChange={changeMessage} value={message}/>
			</form>
		</div>
	)
}

export default Chat;