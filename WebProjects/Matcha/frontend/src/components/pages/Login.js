import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwt from "jsonwebtoken";

import DispatchContext from '../../context/DispatchContext';

const Login = () =>
{
	const globalDispatch = useContext(DispatchContext);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [errorUsername, setErrorUsername] = useState("");
	const [errorPassword, setErrorPassword] = useState("");

	const changeUsername = (event) =>
	{
		setErrorUsername("");
		setUsername(event.target.value)
	}

	const changePassword = (event) =>
	{
		setErrorPassword("");
		setPassword(event.target.value)
	}

	const handleSubmit = async (event) =>
	{
		event.preventDefault();

		if (formIsFilled())
		{
			try
			{
				// log in and get token
				let response = await axios.post('http://localhost:5000/api/account/login/', {username: username, password: password});
				if (response.data.message === "login success")
				{
					localStorage.setItem("BeeTogetherToken", response.data.token);
		
					const tokenDecoded = jwt.decode(localStorage.getItem("BeeTogetherToken"));
		
					response = await axios.get(`http://localhost:5000/api/users/profile/${tokenDecoded.id}`);
		
					localStorage.setItem("BeeTogetherId", response.data.id);
					localStorage.setItem("BeeTogetherUsername", response.data.username);
					localStorage.setItem("BeeTogetherProfileImage", response.data.profile_image);
					localStorage.setItem("BeeTogetherIsAdmin", response.data.admin);
	
					// run only if user has no location on profile
					if (response.data.location === "")
					{
						try
						{
							// Use Google API if the user gives ok
							const location = await axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAReoWkKPG5sQKg8Z7zF8fjCXXwU_67UXs");
		
							const config = {
								headers: {
									'Authorization': "Bearer " + localStorage.getItem("BeeTogetherToken")
								},
							};
		
							await axios.put('http://localhost:5000/api/users/location', {location: "", latitude: location.data.location.lat, longitude: location.data.location.lng}, config);
						}
						catch
						{		
							// if Google API fails, use this		
							const location = await axios.get('https://geoip-db.com/json/')

							const config = {
								headers: {
									'Authorization': "Bearer " + localStorage.getItem("BeeTogetherToken")
								},
							};
							
							await axios.put('http://localhost:5000/api/users/location', {location: "", latitude: location.data.latitude, longitude: location.data.longitude}, config);
						}
					}
					globalDispatch({ type: "login" });
					globalDispatch({ type: "successMessage", value: `Successfully logged in as ${username}.` })
				}
				else if (response.data.message === "account not activated")
					setErrorPassword("Account not activated. Please check your email.");
				else if (response.data.message === "invalid data")
					globalDispatch({ type: "errorMessage", value: "invalid data" })
				else
					setErrorPassword("Invalid username / password combination.");
			}
			catch (err)
			{
				console.error(err.message);
			}
		}
	}
	
	const formIsFilled = () =>
	{
		let missingData = false;

		if (username === "")
		{
			setErrorUsername("Please enter username");
			missingData = true;
		}
		if (password === "")
		{
			setErrorPassword("Please enter password");
			missingData = true;
		}

		if (missingData)
			return 0;
		return 1;
	}

	return (
		<main>
			<div className="box border-dark clamp-300 m-a p-5">
				<h1 className="center"><i className="fas fa-key color-dark mb-4"></i> Log In</h1>

				<form onSubmit={handleSubmit}>

					<label className="mt-2 ml-2 mb-1">Username</label>
					<input
						className="mb-1"
						type="text"
						name="username"
						placeholder="Enter username"
						autoComplete="on"
						value={username}
						onChange={changeUsername}
					/>
					{errorUsername && <div className="small alert alert-error">{errorUsername}</div>}

					<label className="mt-2 ml-2 mb-1">Password</label>
					<input
						className="mb-1"
						type="password"
						name="password"
						placeholder="Enter password"
						autoComplete="current-password"
						value={password}
						onChange={changePassword}
					/>
					{errorPassword && <div className="small alert alert-error">{errorPassword}</div>}
					<div className="mt-1 ml-2"><Link to="/forgotpassword">Forgot password?</Link></div>

					<div className="center mt-4">
						<button type="submit">Log In</button>
					</div>

				</form>

			</div>
			<div className="box border-dark clamp-300 mt-2 m-a py-5 px-5">
				<div className="center">Don't have an account? <Link to='/register'>Register</Link></div>
			</div>
		</main>
	)
}

export default Login;