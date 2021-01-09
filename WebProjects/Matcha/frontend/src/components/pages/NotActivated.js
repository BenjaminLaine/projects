import React from 'react';
import { Link } from 'react-router-dom';

const About = () =>
{
	return (
		<main>
			<div className="box border-dark clamp-700 m-a p-5 center">
				<h1><i className="fas fa-question-circle color-dark mb-4"></i> Not Activated</h1>
				<p>Your account is not activated. Please check your email or <Link to='/activationSent'>send new activation link</Link></p>
			</div>
		</main>
	)
}

export default About;