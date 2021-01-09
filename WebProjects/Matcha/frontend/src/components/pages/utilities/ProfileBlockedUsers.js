import React, { useEffect, useState, useContext, Fragment } from "react";
import axios from "axios";
import clone from "clone";

import StateContext from "../../../context/StateContext";
import DispatchContext from "../../../context/DispatchContext";

import convertTime from "../../functions/convertTime";

const ProfileBlockedUsers = () =>
{
	const globalState = useContext(StateContext);
	const globalDispatch = useContext(DispatchContext);
	const [blockedUsers, setBlockedUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() =>
	{
		setIsLoading(true);

		(async () =>
		{
			try
			{
				// fetch all users
				const users = await axios.get('http://localhost:5000/api/users/nonfiltered', globalState.config);

				// fetch all users you have blocked
				const response = await axios.get('http://localhost:5000/api/blocks/list', globalState.config);

				// add corresponding usernames to the name list
				for (let i = 0; response.data[i]; i++)
				{
					for (let j = 0; users.data[j]; j++)
					{
						if (response.data[i].recipient === users.data[j].id)
							response.data[i].username = users.data[j].username;
					}
				}

				setBlockedUsers(response.data);
				setIsLoading(false);
			}
			catch (err)
			{
				console.log(err.message)
			}
		})();
	}, [globalState.user.id, globalState.config]);

	const removeBlock = async (recipient) =>
	{
		try
		{
			// remove block from the database
			await axios.post("http://localhost:5000/api/blocks/", { recipient: recipient }, globalState.config);
			globalDispatch({ type: "successMessage", value: "User unblocked" })

			// make a clone of state variable
			const newArray = clone(blockedUsers);

			// remove blocked user from the array
			for (let i = 0; i < newArray.length; i++)
			{
				if (newArray[i].recipient === recipient)
					newArray.splice(i, 1);
			}

			setBlockedUsers(newArray);
		}
		catch (err)
		{
			console.log(err.message)
		}
	}

	return (
		<Fragment>
			<h3 className="center">Users You Have Blocked</h3>
			<table>
				<tbody>
					{!isLoading && (blockedUsers.map(blockedUser => (
						<Fragment key={blockedUser.id}>
							<tr>
								<td width="100%" className="small">
									<span className="bold">{blockedUser.username}</span> was blocked on {convertTime(blockedUser.created)}.
								</td>
								<td>
									<button className="button-trash" onClick={() => removeBlock(blockedUser.recipient)} title={"Unblock " + blockedUser.username}>
										<i className="fas fa-ban color-error"></i>
									</button>
								</td>																		
							</tr>
						</Fragment>
					)))}
				</tbody>
			</table>
			<hr className="my-4"></hr>
		</Fragment>
	);
}

export default ProfileBlockedUsers;