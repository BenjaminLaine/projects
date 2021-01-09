import React from "react";
// import { CSSTransition } from "react-transition-group";

import ProfileUpdateUserData from "./utilities/ProfileUpdateUserData";
import ProfileUpdateTags from "./utilities/ProfileUpdateTags";
import ProfileBlockedUsers from './utilities/ProfileBlockedUsers';
import ProfileGallery from "./utilities/ProfileGallery";

const ProfileMy = ({ id }) =>
{
	return (
		<main>
			<div className="ram-container px-2">
				<div className="ram">
					<div className="box border-dark p-5">
						<ProfileUpdateUserData id={id} />
						<ProfileUpdateTags />
						<ProfileBlockedUsers />
					</div>
					<div className="box border-dark p-5">
						<ProfileGallery id={id}/>
					</div>
				</div>
			</div>
		</main>
	)
}

export default ProfileMy;