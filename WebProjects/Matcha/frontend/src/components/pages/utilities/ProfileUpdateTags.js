import React, { useEffect, useState, useContext, Fragment } from "react";
import axios from "axios";

import StateContext from "../../../context/StateContext";
import DispatchContext from "../../../context/DispatchContext";

const ProfileUpdateTags = () =>
{
	const globalState = useContext(StateContext);
	const globalDispatch = useContext(DispatchContext);
	const [isLoading, setIsLoading] = useState(true);
	const [tags, setTags] = useState([]);
	const [tagName, setTagName] = useState("");

	useEffect(() =>
	{
		(async () =>
		{
			try
			{
				// fetch all tags of username
				const response = await axios.get(`http://localhost:5000/api/tags/${globalState.user.id}`);
				setTags(response.data);
				setIsLoading(false);
			}
			catch (err)
			{
				console.log(err.message)
			}
		})();
	}, [globalState.user.id]);

	const addTag = async (event) =>
	{
		event.preventDefault();

		try
		{
			if (tagName.length > 2)
			{
				// add a tag
				await axios.post("http://localhost:5000/api/tags/add", { name: tagName.toLowerCase() }, globalState.config);
				globalDispatch({ type: "successMessage", value: `${tagName}" added to tags` });

				// fetch all your tags
				const response = await axios.get(`http://localhost:5000/api/tags/${globalState.user.id}`);
				setTags(response.data);
				setTagName("");
			}
		}
		catch (err)
		{
			console.log(err.message)
		}
	}

	const removeTag = async (event) =>
	{
		try
		{
			// remove tag
			await axios.delete(`http://localhost:5000/api/tags/${event.target.value}`, globalState.config);
			globalDispatch({ type: "successMessage", value: "Tag removed" })
			
			// fetch all your tags
			const response = await axios.get(`http://localhost:5000/api/tags/${globalState.user.id}`);
			setTags(response.data);
		}
		catch (err)
		{
			console.log(err.message)
		}
	}

	const changeTagName = (event) =>
	{
		const tmp = event.target.value.replace(/[^A-Za-z]/g, '');

		if (tmp.length < 20)
			setTagName(tmp)
	}

return (
	<Fragment>
		{!isLoading && (
			<table className="profile-table m-a">
				<tbody>
					<tr>
						<td className="small right bold nowrap">Tags:</td>
						<td>
							{tags.map(tag => (
								<button
									key={tag.name}
									className="tag-active"
									id={tag.name}
									title={"Remove " + tag.name.toUpperCase()}
									value={tag.id}
									onClick={removeTag}
									>
										{tag.name}
								</button>
							))}
							<form className="chat-input" onSubmit={addTag}>
								<div className="flex-no-wrap">
									<input
										type="text"
										className="mr-2"
										placeholder="Add a tag…"
										autoComplete="off"
										onChange={changeTagName}
										value={tagName}
									/>
									<button>Add Tag</button>
								</div>
							</form>
							<div className="small center">Valid tags have between 3 and 20 characters and contain only alphabetic letters.</div>
						</td>
					</tr>
				</tbody>
			</table>
		)}
	</Fragment>
	);
}

export default ProfileUpdateTags;