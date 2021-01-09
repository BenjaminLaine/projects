import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";

import StateContext from "../../context/StateContext";

import ProfileMy from "./ProfileMy";
import ProfileOther from "./ProfileOther";

const Profile = () =>
{
	const globalState = useContext(StateContext);

	const { id } = useParams();

	const redirect = useRef(0);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() =>
	{
		(async () =>
		{
			try
			{
				if (Number(id) > 0 && Number(id) < 2147483647) 
				{
					// fetch user data
					let response = await axios.get(`http://localhost:5000/api/users/profile/${id}`);

					// see if you have blocked this user
					const youHaveBlocked = await axios.post("http://localhost:5000/api/blocks/haveblocked", { sender: globalState.user.id, recipient: id }, globalState.config);
					
					// see if this user has blocked you
					const theyHaveBlocked = await axios.post("http://localhost:5000/api/blocks/haveblocked", { sender: id, recipient: globalState.user.id }, globalState.config);

					if (youHaveBlocked.data === 0 && theyHaveBlocked.data === 0 && response.data !== "")
						redirect.current = 1;
					else
						redirect.current = 2;
				}
				else
					redirect.current = 2;
				
				setIsLoading(false);
			}
			catch (err)
			{
				console.log(err.message)
			}
		})();
	}, [id, globalState.user.id, globalState.config]); 

	if (id === globalState.user.id)
		return <ProfileMy id={id} />
	if (!isLoading && redirect.current === 1)
		return <ProfileOther id={id} />
	if (!isLoading && redirect.current === 2)
		return <Redirect to="/" />
	else
		return "";
}
export default Profile;