import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const UserItem = ({ user }) =>
{
	// use default image if profile image url does not work
	const addDefaultSrc = (event) =>
	{
		event.target.src = "http://localhost:5000/default.jpg";
	}

	return (
		<div className="user-item">
			<Link to={`/profile/${user.id}`}><img className="list-img" src={user.profile_image} onError={addDefaultSrc} alt='Profile'/></Link><br></br>
			<Link to={`/profile/${user.id}`}>{user.username}</Link><br></br>
			<i className="far fa-address-card"></i> {user.age}<br></br>
			{user.gender === 1 && <Fragment><i className="fas fa-restroom"></i> male<br></br></Fragment>} 
			{user.gender === 2 && <Fragment><i className="fas fa-restroom"></i> female<br></br></Fragment>}
			{user.gender === 3 && <Fragment><i className="fas fa-restroom"></i> other<br></br></Fragment>}
			{user.sexuality === 1 && <Fragment><i className="fas fa-people-arrows"></i> heterosexual<br></br></Fragment>}
			{user.sexuality === 2 && <Fragment><i className="fas fa-people-arrows"></i> homosexual<br></br></Fragment>}
			{user.sexuality === 3 && <Fragment><i className="fas fa-people-arrows"></i> bisexual<br></br></Fragment>}
			<i className="fas fa-heart"></i> {user.fame}<br></br>
			<i className="fas fa-globe-americas"></i> {user.location}<br></br>
		</div>
	)
}

export default UserItem;
