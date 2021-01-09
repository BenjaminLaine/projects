import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import DispatchContext from '../../context/DispatchContext';

const NewPassword = () =>
{
	const globalDispatch = useContext(DispatchContext);

	const { token } = useParams();

	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");

	const [errorPassword1, setErrorPassword1] = useState("");
	const [errorPassword2, setErrorPassword2] = useState("");

	const changePassword1 = (event) =>
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
			setErrorPassword1("Password cannot be longer than 40 characters");
		else if (event.target.value.length < 8)
			setErrorPassword1("Password must be at least 8 characters long");
		else if (!foundLetter)
			setErrorPassword1("Password must contain as least one capital letter [A-Z]");
		else if (!foundNumber)
			setErrorPassword1("Password must contain as least one number [0-9]");
		else
			setErrorPassword1("");

		setPassword1(event.target.value)
	}

	const changePassword2 = (event) =>
	{
		event.target.value !== password1 ? setErrorPassword2("Passwords do not match") : setErrorPassword2("");
		setPassword2(event.target.value)
	}

	const handleSubmit = async (event) =>
	{
		event.preventDefault();

		if (formIsFilled() && password1 === password2)
		{
			try
			{
				await axios.post(`http://localhost:5000/api/account/newpassword/${token}`, { password: password1 })

				setPassword1("");
				setPassword2("");
				globalDispatch({ type: "successMessage", value: "Password changed" })
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

		if (password1 === "")
		{
			setErrorPassword1("Please enter password");
			missingData = true;
		}
		if (password2 === "")
		{
			setErrorPassword2("Please enter password confirmation");
			missingData = true;
		}
		if (missingData)
			return 0;
		return 1;
	}

	return (
		<main>
			<div className="box border-dark clamp-300 m-a p-5">
				<h1 className="center"><i className="fas fa-unlock-alt color-dark mb-4"></i> New Password</h1>
				<p className="center">Please enter a new password. Your current password will be replaced.</p>
				<form onSubmit={handleSubmit}>
					
					<label className="mt-2 ml-2 mb-1">New Password</label>
					<input
						className="mb-1"
						type="password"
						name="password1"
						placeholder="Enter password"
						value={password1}
						onChange={changePassword1}
					/>
					{errorPassword1 && <div className="small alert alert-error">{errorPassword1}</div>}

					<label className="mt-2 ml-2 mb-1">Confirm New Password</label>
					<input
						className="mb-1"
						type="password"
						name="password2"
						placeholder="Confirm Password"
						value={password2}
						onChange={changePassword2}
					/>
					{errorPassword2 && <div className="small alert alert-error">{errorPassword2}</div>}
	
					<div className="center mt-5">
						<button type="submit">Change Password</button>
					</div>
				</form>		
			</div>
		</main>
	)
}

export default NewPassword;