import React from 'react';

const About = () =>
{
	return (
		<main>
			<div className="box border-dark clamp-700 m-a p-5 center">
				<h1><i className="fas fa-info-circle color-dark mb-4"></i> About</h1>
				<p>
					BeeTogether is the hottests and fastest growing dating app for new meeting people.
					It doesn't matter if you are ugly, stupid or poor - we will help you to find your soulmale.
				</p>
				<p>
					Our patented LoveSearch™ algorithm will instantly sort through thousands of high-quality candidates to find suitable matches just for you.
				</p>
				<p>
					So what are you waiting for? Sign up today and change your life!
				</p>
				<p className="small">Background image by <a href='https://www.freepik.com/photos/wedding'>freepik.com</a></p>
			</div>
		</main>
	)
}

export default About;