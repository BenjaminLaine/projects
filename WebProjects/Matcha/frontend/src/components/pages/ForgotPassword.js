import React, { useContext, useState } from 'react';
import axios from 'axios';

import DispatchContext from '../../context/DispatchContext';

const ForgetPassword = () =>
{
	const globalDispatch = useContext(DispatchContext);

	const [email, setEmail] = useState("");
	const [errorEmail, setErrorEmail] = useState("");

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

	const handleSubmit = async (event) =>
	{
		event.preventDefault();

		if (formIsFilled())
		{
			try
			{
				await axios.post('http://localhost:5000/api/account/forgotpassword', {email: email})

				setEmail("");
				globalDispatch({ type: "successMessage", value: "Email sent. Please check your email." })
			}
			catch (err)
			{
				console.error(err.message);
			}
		}
	}

	const formIsFilled = () =>
	{
		if (email === "")
		{
			setErrorEmail("Please enter email");
			return 0;
		}
		return 1;
	}

	return (
		<main>
			<div className="box border-dark clamp-300 m-a p-5">
				<h1 className="center"><i className="far fa-question-circle color-dark mb-4"></i> Forgot Password</h1>
				<p className="center">Please enter your account email address.</p>
				<form onSubmit={handleSubmit}>
					<label className="mt-2 ml-2 mb-1">Email</label>
					<input
						className="mb-1"
						type="email"
						name="email"
						placeholder="Enter email address"
						value={email}
						onChange={changeEmail}
					/>
					{errorEmail && <div className="small alert alert-error">{errorEmail}</div>}

					<div className="center mt-5">
						<button type="submit">Send Password Changing Link</button>
					</div>
				</form>	
			</div>
		</main>
	)
}

export default ForgetPassword;