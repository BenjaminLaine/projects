import React, { useState, useContext, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import DispatchContext from '../../context/DispatchContext';

const Register = () =>
{
	const globalDispatch = useContext(DispatchContext);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [age, setAge] = useState("");
	const [gender, setGender] = useState("");
	const [sexuality, setSexuality] = useState("");
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");

	const [errorUsername, setErrorUsername] = useState("");
	const [errorEmail, setErrorEmail] = useState("");
	const [errorAge, setErrorAge] = useState("");
	const [errorGender, setErrorGender] = useState("");
	const [errorSexuality, setErrorSexuality] = useState("");
	const [errorPassword1, setErrorPassword1] = useState("");
	const [errorPassword2, setErrorPassword2] = useState("");

	const [formSent, setFormSent] = useState(false);

	const changeUsername = (event) =>
	{
		const pattern = /^[A-Za-z]+$/;

		if (!pattern.test(event.target.value) && event.target.value.length > 0)
			setErrorUsername("Username can only contain letters (a-z, A-Z)");
		else if (event.target.value.length < 3)
			setErrorUsername("Username must be at least 3 characters long");
		else if (event.target.value.length > 20)
			setErrorUsername("Username cannot be longer than 20 characters");
		else
			setErrorUsername("");

		setUsername(event.target.value);
	}

	const changeEmail = (event) =>
	{
		const pattern = /\S+@\S+\.\S+/;

		if (event.target.value.length > 40)
			setErrorEmail("Email cannot be longer than 40 characters");
		else if (!pattern.test(event.target.value) && event.target.value.length > 0)
			setErrorEmail("Invalid email format");
		else
			setErrorEmail("");

		setEmail(event.target.value)
	}

	const changeAge = (event) =>
	{
		setErrorAge("");
		setAge(event.target.value)
	}

	const changeGender = (event) =>
	{
		setErrorGender("");
		setGender(event.target.value)
	}

	const changeSexuality = (event) =>
	{
		setErrorSexuality("");
		setSexuality(event.target.value)
	}

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
		if (event.target.value !== password1)
			setErrorPassword2("Passwords do not match");
		else
			setErrorPassword2("");

		setPassword2(event.target.value)
	}

	const handleSubmit = async (event) =>
	{
		event.preventDefault();

		if (formIsFilled() && noErrors() && password1 === password2)
		{
			try
			{
				const response = await axios.post('http://localhost:5000/api/account/register', {
					username: username,
					email: email,
					age: age,
					gender: gender,
					sexuality: sexuality,
					password: password1
				});

				if (response.data.message === "username already exists")
					setErrorUsername("username already exists");
				else if (response.data.message === "email used by another account")
					setErrorEmail("email used by another account");
				else if (response.data.message === "invalid data")
					globalDispatch({ type: "errorMessage", value: "invalid data" })
				else
				{
					resetForm();
					globalDispatch({ type: "successMessage", value: "Account created. Please check your email." })
					setFormSent(true);
				}
			}
			catch (err)
			{
				console.error(err.message);
			}
		}
	}

	const noErrors = () =>
	{
		if (errorUsername === "" && errorEmail === "" && errorAge === "" &&
			errorGender === "" && errorSexuality === "" && errorPassword1 === "" && errorPassword2 === "")
			return true;
		return false;
	}

	const formIsFilled = () =>
	{
		let missingData = false;

		if (username === "")
		{
			setErrorUsername("Please enter username");
			missingData = true;
		}
		if (email === "")
		{
			setErrorEmail("Please enter email");
			missingData = true;
		}
		if (age === "")
		{
			setErrorAge("Please enter age");
			missingData = true;
		}
		if (gender === "")
		{
			setErrorGender("Please select gender");
			missingData = true;
		}
		if (sexuality === "")
		{
			setErrorSexuality("Please select sexuality");
			missingData = true;
		}
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

	const resetForm = () =>
	{
		setUsername("");
		setEmail("");
		setAge("");
		setGender("");
		setSexuality("");
		setPassword1("");
		setPassword2("");
	}

	return (
		<Fragment>
			{formSent && <Redirect to="/activationsent" />}
			<main>
				<div className="box border-dark clamp-300 m-a p-5">
					<h1 className="center"><i className="fas fa-edit color-dark mb-4"></i> Register</h1>

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

					<label className="mt-2 ml-2 mb-1">Email</label>
					<input
						className="mb-1"
						type="email"
						name="email"
						placeholder="Enter email address"
						autoComplete="email"
						value={email}
						onChange={changeEmail}
					/>
					{errorEmail && <div className="small alert alert-error">{errorEmail}</div>}

					<hr className="mt-4"></hr>

					<label className="mt-2 ml-2 mb-1">Age</label>
						<input
							className="mb-1"
							name="age"
							type="number"
							placeholder="Enter age"
							min="18"
							max="100"
							value={age}
							onChange={changeAge}
						/>
					{errorAge && <div className="small alert alert-error">{errorAge}</div>}

					<label className="mt-2 ml-2 mb-1">Gender</label>
					<select
						className="mb-1"
						name="gender"
						value={gender}
						onChange={changeGender}
					>
						<option value="" ></option>
						<option value="1">Male</option>
						<option value="2">Female</option>
						<option value="3">Other</option>
					</select>
					{errorGender && <div className="small alert alert-error">{errorGender}</div>}

					<label className="mt-2 ml-2 mb-1">Sexuality</label>
					<select
						className="mb-1"
						name="sexuality"
						value={sexuality}
						onChange={changeSexuality}
					>
						<option value="" ></option>
						<option value="1">Heterosexual</option>
						<option value="2">Homosexual</option>
						<option value="3">Bisexual</option>
					</select>
					{errorSexuality && <div className="small alert alert-error">{errorSexuality}</div>}

					<hr className="mt-4"></hr>
					
					<label className="mt-2 ml-2 mb-1">Password</label>
					<input
						className="mb-1"
						type="password"
						name="password1"
						placeholder="Enter password"
						autoComplete="new-password"
						value={password1}
						onChange={changePassword1}
					/>
					{errorPassword1 && <div className="small alert alert-error">{errorPassword1}</div>}

					<label className="mt-2 ml-2 mb-1">Confirm Password</label>
					<input
						className="mb-1"
						type="password"
						name="password2"
						placeholder="Confirm Password"
						autoComplete="new-password"
						value={password2}
						onChange={changePassword2}
					/>
					{errorPassword2 && <div className="small alert alert-error">{errorPassword2}</div>}

					<div className="small center">Password must be at least 8 characters in length,</div>
					<div className="small center">contain a minimum of one upper case letter [A-Z]</div>
					<div className="small center">and contain a minimum of one number [0-9]</div>

					<hr className="mt-4"></hr>

					<div className="center mt-4">
						<button type="submit">Register</button>
					</div>

					</form>

				</div>
				<div className="box border-dark clamp-300 mt-2 m-a py-5 px-5">
					<div className="center">Already have an account? <Link to='/login'>Log In</Link></div>
				</div>
			</main>
		</Fragment>
	)
}

export default Register;