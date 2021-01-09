import React, { useState, useContext, useEffect, Fragment } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';

import StateContext from "../../context/StateContext";
import DispatchContext from "../../context/DispatchContext";

import convertTime from "../functions/convertTime";

const ProfileOther = ({ id }) =>
{
	const globalState = useContext(StateContext);
	const globalDispatch = useContext(DispatchContext);

	const [data, setData] = useState([]);
	const [tags, setTags] = useState([]);
	const [youHaveBeeped, setYouHaveBeeped] = useState(false);
	const [theyHaveBeeped, setTheyHaveBeeped] = useState(false);
	const [gallery, setGallery] = useState([]);
	const [blocked, setBlocked] = useState(false);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() =>
	{
		(async () =>
		{
			try
			{
				// fetch public data of current profile page
				let response = await axios.get(`http://localhost:5000/api/users/profile/${id}`);
				setData(response.data);
	
				// find out if you have beeped this user
				response = await axios.post('http://localhost:5000/api/beeps/havebeeped', { sender: globalState.user.id, recipient: id }, globalState.config);
				response.data ? setYouHaveBeeped(true) : setYouHaveBeeped(false);
				
				// find out if they have beeped you
				response = await axios.post('http://localhost:5000/api/beeps/havebeeped', { sender: id, recipient: globalState.user.id }, globalState.config);
				response.data ? setTheyHaveBeeped(true) : setTheyHaveBeeped(false);
				
				// fetch all tags of username
				response = await axios.get(`http://localhost:5000/api/tags/${id}`);
				setTags(response.data);
				
				// fetch gallery images
				const images = await axios.post('http://localhost:5000/api/images/gallery', { owner: id });
				setGallery(images.data);

				// send a notification that you have visited this profile
				await axios.post('http://localhost:5000/api/notifications/create', { type: 1, sender: globalState.user.id, recipient: id }, globalState.config);
			
				setIsLoading(false);
			}
			catch (err)
			{
				console.log(err.message)
			}
		})();
	}, [id, globalState.user.id, globalState.user.profileImage, globalState.config]);

	const handleBeep = async () =>
	{
		try
		{
			// add or remove beep from the database
			await axios.post("http://localhost:5000/api/beeps/", { recipient: id }, globalState.config);

			// find out if you have beeped this users
			const youHaveBeeped = await axios.post('http://localhost:5000/api/beeps/havebeeped', { sender: globalState.user.id, recipient: id }, globalState.config);

			// find out if this user has beeped you
			const otherHasBeeped = await axios.post('http://localhost:5000/api/beeps/havebeeped', { sender: id, recipient: globalState.user.id }, globalState.config);
			
			// if you have not beeped this user
			if (youHaveBeeped.data)
			{
				setYouHaveBeeped(true)

				// send a notification that you beeped this user
				await axios.post('http://localhost:5000/api/notifications/create', { type: 2, sender: globalState.user.id, recipient: id }, globalState.config);

				if (otherHasBeeped.data)
				{
					// send a notification that you and this user are connected
					await axios.post('http://localhost:5000/api/notifications/create', { type: 4, sender: globalState.user.id, recipient: id }, globalState.config);
					await axios.post('http://localhost:5000/api/notifications/create', { type: 4, sender: id, recipient: globalState.user.id }, globalState.config);
				}

				globalDispatch({ type: "successMessage", value: `You beeped ${data.username}` })
			}
			else
			{
				setYouHaveBeeped(false);

				if (otherHasBeeped.data)
				{
					// send a notification that your connection has been broken
					await axios.post('http://localhost:5000/api/notifications/create', { type: 5, sender: globalState.user.id, recipient: id }, globalState.config);
					await axios.post('http://localhost:5000/api/notifications/create', { type: 5, sender: id, recipient: globalState.user.id }, globalState.config);
				}

				// send notification that you unbeeped this user
				await axios.post('http://localhost:5000/api/notifications/create', { type: 3, sender: globalState.user.id, recipient: data.id }, globalState.config);
				globalDispatch({ type: "successMessage", value: `You unbeeped ${data.username}` })
			}
		}
		catch (err)
		{
			console.log(err.message)
		}
	}

	const handleReport = async () =>
	{
		try
		{
			// report current username
			await axios.post("http://localhost:5000/api/reports/", { recipient: id }, globalState.config);
			globalDispatch({ type: "successMessage", value: `You reported ${data.username} as fake account` })
		}
		catch (err)
		{
			console.log(err.message)
		}
	}

	const handleBlock = async () =>
	{
		try
		{
			// add block to the database
			await axios.post("http://localhost:5000/api/blocks/", { recipient: id }, globalState.config);
			globalDispatch({ type: "successMessage", value: `You blocked ${data.username}` })
			setBlocked(true);
		}
		catch (err)
		{
			console.log(err.message)
		}
	}

	return (
		<main>
			{blocked && (<Redirect to="/" />)}
			<div className="ram-container px-2">
				<div className="ram">
					<div className="box border-dark p-5">

					{/* PROFILE HEADER */}
						<div className="flex-center">
							<div className="flex-column">
								<div className="m-2">
									<button className="button-trash right" onClick={handleReport} title={"Report " + data.username}>
										<i className="fas fa-flag color-black60 fa-2x"></i>
									</button>
								</div>
								<div className="m-2">
									<button className="button-trash right" onClick={handleBlock} title={"Block " + data.username}>
										<i className="fas fa-ban color-black60 fa-2x"></i>
									</button>
								</div>
							</div>
							<div>
								<img className="profile-img-large m-a" src={data.profile_image} alt='Profile'/>
							</div>
							<div className="flex-column">
								<div className="m-2">
								{youHaveBeeped && theyHaveBeeped ? (
									<button className="button-trash" onClick={() => globalDispatch({ type: "openChat", value: data.id })} title={"Chat with " + data.username}>
										<i className="fas fa-comment-dots color-info fa-2x"></i>
									</button>
									) : (
									<i className="fas fa-comment-dots color-light fa-2x"></i>
								)}

								</div>
								<div className="m-2">
									{globalState.user.profileImage !== "http://localhost:5000/default.jpg" ? (
										<button className="button-trash" onClick={handleBeep} title="Toggle Beep">
											{youHaveBeeped ? <i className="fas fa-heart color-pink fa-2x"></i> : <i className="far fa-heart color-pink fa-2x"></i>}
										</button>
									) :
									<i className="far fa-heart color-light fa-2x"></i>}
									{!theyHaveBeeped ? <i className="far fa-heart color-pink" title={data.username + " has not Beeped you"}></i> : ""}
									{!youHaveBeeped && theyHaveBeeped ? <i className="fas fa-heart color-pink" title={data.username + " has Beeped you"}></i> : ""}
									{youHaveBeeped && theyHaveBeeped ? <i className="fas fa-link color-pink"  title={"You have a connection with " + data.username}></i> : ""}
								</div>
							</div>
						</div>
						<div className="center">
							{youHaveBeeped && theyHaveBeeped ? <h3 className="color-pink">{data.username}</h3> : <h3>{data.username}</h3>}
							{data.online ? <div className="badge bg-primary">ONLINE</div> :
							<Fragment>
								<div className="badge bg-light">OFFLINE</div><div className="small">Last seen online {convertTime(data.last_seen)}</div>
							</Fragment>}
						</div>

					{/* USER DATA TABLE */}
						<table className="profile-table m-a mb-4">
							<tbody>
								<tr>
									<td className="right small bold nowrap">
										Location:
									</td>
									<td>
										{data.location}
									</td>
								</tr>
								<tr>
									<td className="right small bold nowrap">
										First Name:
									</td>
									<td>
										{data.first_name}
									</td>
								</tr>
								<tr>
									<td className="right small bold nowrap">
										Last Name:
									</td>
									<td>
										{data.last_name}
									</td>
								</tr>
								<tr>
									<td className="right small bold nowrap">
										Age:
									</td>
									<td>
										{data.age}
									</td>
								</tr>
								<tr>
									<td className="right small bold nowrap">
										Gender:
									</td>
									{data.gender === 1 && <td>male<br></br></td>}
									{data.gender === 2 && <td>female<br></br></td>}
									{data.gender === 3 && <td>other<br></br></td>}
								</tr>
								<tr>
									<td className="right small bold nowrap">
										Sexuality:
									</td>
									{data.sexuality === 1 && <td>heterosexual<br></br></td>}
									{data.sexuality === 2 && <td>homosexual<br></br></td>}
									{data.sexuality === 3 && <td>bisexual<br></br></td>}
								</tr>
								<tr>
									<td className="right small bold nowrap">
										Bio:
									</td>
									<td>
										{data.bio}
									</td>
								</tr>
								<tr>
									<td className="right small bold nowrap">
										Fame:
									</td>
									<td>
										{data.fame}  <i className="fas fa-heart color-pink"></i>
									</td>
								</tr>
								<tr>
									<td className="right small bold nowrap">
										Joined:
									</td>
									<td>
										{convertTime(data.created)}
									</td>
								</tr>
								<tr>
								<td className="right small bold nowrap">Tags:</td>
								<td>
									{tags.map(tag => (
										<Fragment key={tag.name}>{tag.name}<br></br></Fragment>
									))}
								</td>
							</tr>
							</tbody>
						</table>
					</div>
					<div className="box border-dark p-5">
						<div className="flex-center">
							<h1>Gallery</h1>
							{isLoading && (<div>Loading...</div>)}
							{!isLoading && (
								<div>
									{gallery.map(row => (
										<div className="gallery-canvas" key={row.id}>
											<img className="gallery-image" src={row.name} alt="Gallery"></img>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default ProfileOther;