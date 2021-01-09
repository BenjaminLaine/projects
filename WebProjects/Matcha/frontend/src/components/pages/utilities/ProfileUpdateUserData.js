import React, { useState, useContext, useEffect, Fragment } from "react";
import axios from "axios";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import clone from "clone";

import StateContext from "../../../context/StateContext";
import DispatchContext from "../../../context/DispatchContext";

import convertTime from "../../functions/convertTime";

const ProfileUpdateUserData = ({ id }) =>
{
	const globalState = useContext(StateContext);
	const globalDispatch = useContext(DispatchContext);

	const [data, setData] = useState([]);

	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword1, setNewPassword1] = useState("");
	const [newPassword2, setNewPassword2] = useState("");

	const [errorCurrentPassword, setErrorCurrentPassword] = useState("");
	const [errorNewPassword1, setErrorNewPassword1] = useState("");
	const [errorNewPassword2, setErrorNewPassword2] = useState("");

	const [address, setAddress] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() =>
	{
		(async () =>
		{
			try
			{
				// fetch private data of logged in user
				let response = await axios.get("http://localhost:5000/api/users/private/", globalState.config);

				setData(response.data);
				setAddress(response.data.location);
				setIsLoading(false);
			}
			catch (err)
			{
				console.log(err.message)
			}
		})();
	}, [id, globalState.user.username, globalState.config, data.online]);

	const handleCurrentPassword = (event) =>
	{
		if (event.target.value.length > 40)
			setErrorCurrentPassword("Password cannot be longer than 40 characters");
		else
			setErrorCurrentPassword("");
		setCurrentPassword(event.target.value);
	}

	const handleNewPassword1 = (event) =>
	{
		let foundLetter = false;
		let foundNumber = false;
		for (let i = 0; event.target.value[i]; i++)
		{
			if (Number.isInteger(Number(event.target.value[i])))
				foundNumber = true;
			else if (event.target.value[i] === event.target.value[i].toUpperCase())
				foundLetter = true;
		}
		if (event.target.value.length > 40)
			setErrorNewPassword1("Password cannot be longer than 40 characters");
		else if (event.target.value.length < 8)
			setErrorNewPassword1("Password must be at least 8 characters long");
		else if (!foundLetter)
			setErrorNewPassword1("Password must contain as least one capital letter [A-Z]");
		else if (!foundNumber)
			setErrorNewPassword1("Password must contain as least one number [0-9]");
		else
			setErrorNewPassword1("");

		setNewPassword1(event.target.value);
	}

	const handleNewPassword2 = (event) =>
	{
		if (event.target.value !== newPassword1)
			setErrorNewPassword1("Passwords do not match");
		else
			setErrorNewPassword1("");

		setNewPassword2(event.target.value);
	}

	const handleEmail = (event) =>
	{
		let tmp = clone(data);
		tmp.email = event.target.value;
		if (tmp.email.length < 40)
			setData(tmp);
	}

	const handleFirstName = (event) =>
	{
		let tmp = clone(data);
		tmp.first_name = event.target.value.replace(/[^A-Za-z]/g, '');
		if (tmp.first_name.length < 20)
			setData(tmp);
	}

	const handleLastName = (event) =>
	{
		let tmp = clone(data);
		tmp.last_name = event.target.value.replace(/[^A-Za-z]/g, '');
		if (tmp.last_name.length < 20)
			setData(tmp);
	}

	const handleAge = (event) =>
	{
		let tmp = clone(data);
		tmp.age = event.target.value;
		setData(tmp);
	}

	const handleGender = (event) =>
	{
		let tmp = clone(data);
		tmp.gender = event.target.value;
		setData(tmp);
	}

	const handleSexuality = (event) =>
	{
		let tmp = clone(data);
		tmp.sexuality = event.target.value;
		setData(tmp);
	}

	const handleBio = (event) =>
	{
		let tmp = clone(data);
		tmp.bio = event.target.value.replace(/[^A-Za-z0-9 ]/g, '');
		if (tmp.bio.length < 301)
			setData(tmp);
	}

	const handlePasswordSubmit = async (event) =>
	{
		event.preventDefault();

		if (formIsFilled() && newPassword1 === newPassword2)
		{
			try
			{
				// update rest of the profile information
				const response = await axios.put("http://localhost:5000/api/users/changepassword",{ currentPassword: currentPassword, newPassword: newPassword1 }, globalState.config);

				if (response.data === "invalid password")
					setErrorCurrentPassword("invalid password");
				else
				{
					setCurrentPassword("");
					setNewPassword1("");
					setNewPassword2("");
					globalDispatch({ type: "successMessage", value: "Your password has been changed" })
				}
			}
			catch (err)
			{
				console.error(err.message);
			}
		}
	}

	const handleDataSubmit = async (event) =>
	{
		event.preventDefault();

		try
		{
			let latLng = [];
			if (address === "")
			{
				try
				{
					const location = await axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAReoWkKPG5sQKg8Z7zF8fjCXXwU_67UXs");
					latLng.lat = location.data.location.lat;
					latLng.lng = location.data.location.lng;
				}
				catch
				{
					const location = await axios.get('https://geoip-db.com/json/')
					latLng.lat = location.data.latitude;
					latLng.lng = location.data.longitude;
				}
			}
			else
			{
				const results = await geocodeByAddress(address);
				latLng = await getLatLng(results[0]);
			}
			// update location, latitude and longitude
			await axios.put("http://localhost:5000/api/users/location",
			{
				location: address,
				latitude: latLng.lat,
				longitude: latLng.lng
			}, globalState.config);
			// update rest of the profile information
			await axios.put("http://localhost:5000/api/users/data",
			{
				email: data.email,
				firstName: data.first_name,
				lastName: data.last_name,
				age: data.age,
				gender: data.gender,
				sexuality: data.sexuality,
				bio: data.bio
			}, globalState.config);
			globalDispatch({ type: "successMessage", value: "Your profile information has been updated." })
		}
		catch (err)
		{
			console.error(err.message);
		}
	}

	const formIsFilled = () =>
	{
		let missingData = false;

		if (currentPassword === "")
		{
			setErrorCurrentPassword("Please enter current password");
			missingData = true;
		}
		if (newPassword1 === "")
		{
			setErrorNewPassword1("Please enter password");
			missingData = true;
		}
		if (newPassword2 === "")
		{
			setErrorNewPassword2("Please enter password confirmation");
			missingData = true;
		}
		if (missingData)
			return 0;
		return 1;
	}

	const onError = (status, clearSuggestions) =>
	{
		console.log('Google Maps API returned error with status: ', status)
		clearSuggestions()
	}

	return (
		<Fragment>
			{!isLoading && (
			<Fragment>

			{/* PROFILE HEADER */}
			<div className="flex-center">
				<img className="profile-img-large m-a" src={globalState.user.profileImage} alt='Profile'/>
			</div>
			<div className="center">
				<h3>{data.username}</h3>
				<div className="badge bg-primary">ONLINE</div>
			</div>

			<form onSubmit={handlePasswordSubmit}>

				<table className="profile-table m-a mb-4">
					<tbody>

						<tr>
							<td className="small right bold nowrap">
								Current Password:
							</td>
							<td>
								<input
									type="password"
									value={data.currentPassword}
									placeholder="Enter current password"
									autoComplete="current-password"
									onChange={handleCurrentPassword}
								/>
								{errorCurrentPassword && <div className="small alert alert-error">{errorCurrentPassword}</div>}
							</td>															
						</tr>

						<tr>
							<td className="small right bold nowrap">
								New Password:
							</td>
							<td>
								<input
									type="password"
									value={data.newPassword1}
									placeholder="Enter new password"
									autoComplete="new-password"
									onChange={handleNewPassword1}
								/>
								{errorNewPassword1 && <div className="small alert alert-error">{errorNewPassword1}</div>}
							</td>															
						</tr>

						<tr>
							<td className="small right bold nowrap">
								Confirm New Password:
							</td>
							<td>
								<input
									type="password"
									value={data.newPassword2}
									placeholder="Confirm new password"
									autoComplete="new-password"
									onChange={handleNewPassword2}
								/>
								{errorNewPassword2 && <div className="small alert alert-error">{errorNewPassword2}</div>}
							</td>															
						</tr>

						<tr>
							<td colSpan="2" className="center">
								<button className="m-1">Change Password</button>
							</td>															
						</tr>

					</tbody>
				</table>
			</form>

			{/* USER DATA TABLE */}
			<form onSubmit={handleDataSubmit}>

				<table className="profile-table m-a mb-4">
					<tbody>
						<tr>
							<td className="small right bold nowrap">
								Location:
							</td>
							<td>
								<PlacesAutocomplete
									value={address}
									onChange={setAddress}
									onError={onError}
								>
									{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
										<div>
											<input {...getInputProps({ placeholder: "Type location" })} />
											<div>
												{loading ? <div>...loading</div> : null}
												{suggestions.map(suggestion => {
													const style = {
														backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
													};
													return (
														<Fragment key={suggestion.description}>
															<div {...getSuggestionItemProps(suggestion, { style })}>
																{suggestion.description}
															</div>
														</Fragment>
													);
												})}
											</div>
										</div>
									)}
								</PlacesAutocomplete>
							</td>															
						</tr>
						<tr>
							<td className="small right bold nowrap">
								Email:
							</td>
							<td>
								<input type="email" value={data.email} onChange={handleEmail}/>
							</td>															
						</tr>
						<tr>
							<td className="small right bold nowrap">
								First Name:
							</td>
							<td>
								<input type="text" value={data.first_name} onChange={handleFirstName}/>
							</td>															
						</tr>
						<tr>
							<td className="small right bold nowrap">
								Last Name:
							</td>
							<td>
								<input type="text" value={data.last_name} onChange={handleLastName}/>
							</td>															
						</tr>
						<tr>
							<td className="small right bold nowrap">
								Age:
							</td>
							<td>
								<input type="number" min="18" max="100" value={data.age} onChange={handleAge}/>
							</td>															
						</tr>
						<tr>
							<td className="small right bold nowrap">
								Gender:
							</td>
							<td>
								<select selected value={data.gender} onChange={handleGender}>
									<option value="1">Male</option>
									<option value="2">Female</option>
									<option value="3">Other</option>
								</select>
							</td>															
						</tr>
						<tr>
							<td className="small right bold nowrap">
								Sexuality:
							</td>
							<td>
							<select selected value={data.sexuality} onChange={handleSexuality}>
									<option value="1">Heterosexual</option>
									<option value="2">Homosexual</option>
									<option value="3">Bisexual</option>
								</select>
							</td>															
						</tr>
						<tr>
							<td className="small right bold nowrap">
								Bio:
							</td>
							<td>
								<textarea rows="4" value={data.bio} onChange={handleBio}/>
								<div className="small center">{300 - data.bio.length} characters left</div>
							</td>															
						</tr>
						<tr>
							<td className="small right bold nowrap">
								Fame:
							</td>
							<td>
								{data.fame} <i className="fas fa-heart color-pink"></i>
							</td>																
						</tr>
						<tr>
							<td className="small right bold nowrap">
								Joined:
							</td>
							<td>
								{convertTime(data.created)}
							</td>																
						</tr>
						<tr>
							<td colSpan="2" className="center">
								<button className="m-1">Update User Data</button>
							</td>															
						</tr>
					</tbody>
				</table>
			</form>
			</Fragment>
		)}
		</Fragment>
	);
}

export default ProfileUpdateUserData;