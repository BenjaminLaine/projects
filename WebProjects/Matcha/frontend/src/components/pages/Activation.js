import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";

const Activation = () =>
{
	let { key } = useParams();

	// check if activation key exists

	(async () =>
	{
		try
		{
			await axios.get(`http://localhost:5000/api/account/activate/${key}`);
		}
		catch (err)
		{
			console.error(err.message);
		}
	}
	)()

	return (
		<main>
			<div className="box border-dark clamp-700 m-a p-5 center">
				<h1><i className="far fa-thumbs-up color-dark mb-4"></i> Activation</h1>
				<p>Account activated!</p>
				<p>You can now <Link to="/login">Log In</Link>.</p>
			</div>
		</main>
	)
}

export default Activation;