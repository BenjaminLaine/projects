import React from 'react';
import { Link } from 'react-router-dom'

const LocationPin = ({ user }) =>
{
	return (
		<div className="location-pin">
			<Link to={`/profile/${user.id}`} alt={user.username} title={user.username}>
				<img className="profile-img-map" src={user.profile_image} alt='Profile'/>
			</Link>
		</div>
	)
}

export default LocationPin;