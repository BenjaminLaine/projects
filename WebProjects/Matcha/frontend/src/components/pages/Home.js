import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import getDistance from 'geolib/es/getDistance';
import clone from "clone";

import StateContext from "../../context/StateContext";

import UserItem from "./utilities/UserItem";
import Spinner from "../layout/Spinner";

const Home = () =>
{
	const globalState = useContext(StateContext);

	const [usersDistance, setUsersDistance] = useState([]);
	const [usersTags, setUsersTags] = useState([]);
	const [usersFame, setUsersFame] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() =>
	{
		setIsLoading(true);

		(async () =>
		{
			try
			{
				// fetch data of all users
				let response = await axios.get('http://localhost:5000/api/users/', globalState.config);
				let users = clone(response.data);

				// fetch logged in user data
				response = await axios.get(`http://localhost:5000/api/users/profile/${globalState.user.id}`, globalState.config);
				const loggedInUser = clone(response.data);

				// ************************************************************************
				// * DISTANCE *************************************************************
				// ************************************************************************

				// for each user, calculate location and distance from logged in user 
				users.map(user => {
					return (
						user.distance = Math.round(getDistance(
							{ latitude: loggedInUser.latitude, longitude: loggedInUser.longitude },
							{ latitude: user.latitude, longitude: user.longitude }
						) / 1000)
					)
				});

				// sort users my distance
				users.sort((a, b) => a.distance - b.distance);

				// take the first 50 users
				let fiftyUsers = users.slice([0], [50]);

				// choose 5 random users from the 50
				let fiveRandomUsers = [];

				for (let i = 0; i < 5; i++)
				{
					const index = Math.floor(Math.random() * fiftyUsers.length);
					fiveRandomUsers.push(fiftyUsers[index]);
					fiftyUsers.splice(index, 1);
				}

				setUsersDistance(fiveRandomUsers);

				// ************************************************************************
				// * TAGS *****************************************************************
				// ************************************************************************

				let allTags = await axios.get("http://localhost:5000/api/tags/sametags", globalState.config);

				// remove blocked users
				for (let i = 0; i < allTags.data.length; i++)
				{
					let found = false;
					for (let j = 0; users[j]; j++)
					{
						if (users[j].id === allTags.data[i].owner)
							found = true;
					}
					if (found === false)
					{
						allTags.data.splice(i, 1);
						i--;
					}
				}

				for (let i = 0; i < allTags.data.length;)
				{
					allTags.data[i].count = 1;
					i++;

					for (let j = i - 1; i < allTags.data.length && allTags.data[j].owner === allTags.data[i].owner;)
					{
						allTags.data[j].count++;
						allTags.data.splice(i, 1);
					}
				}

				allTags.data.sort((a, b) => b.count - a.count);
				allTags.data = allTags.data.slice(0, 50);

				let chosenUsers = [];

				if (allTags.data.length > 4)
				{
					for (let i = 0; i < 5; i++)
					{
						const randomIndex = Math.floor(Math.random() * allTags.data.length);
						chosenUsers.push(allTags.data[randomIndex].owner);
						allTags.data.splice(randomIndex, 1);
					}
				}
				else
					chosenUsers = clone(allTags.data);

				// get rest of the user data based on id
				var chosenUsersData = [];
				
				for (let i = 0; i < users.length; i++)
				{
					for (let j = 0; chosenUsers[j]; j++)
					{
						if (users[i].id === chosenUsers[j])
							chosenUsersData.push(users[i]);
					}
				}
				setUsersTags(chosenUsersData);

				// ************************************************************************
				// * FAME *****************************************************************
				// ************************************************************************
				
				// sort users by fame (descending)
				users.sort((a, b) => b.fame - a.fame);

				// take the first 50 users
				fiftyUsers = users.slice([0], [50]);

				// select 5 random users from the 50
				fiveRandomUsers = [];
				for (let i = 0; i < 5; i++)
				{
					const index = Math.floor(Math.random() * fiftyUsers.length);
					fiveRandomUsers.push(fiftyUsers[index]);
					fiftyUsers.splice(index, 1);
				}
				setUsersFame(fiveRandomUsers);
				setIsLoading(false);
			}
			catch (err)
			{
				console.error(err.message);
			}
		}
		)()
	}, [globalState.user.id, globalState.config]);

	return (
		<main>
			<div className="ram-container px-2">
				<div className="ram">
					<div className="box border-dark p-5">
						<h1 className="center">Welcome to BeeTogether</h1>
						<hr className="my-2"></hr>
						<h2 className="center">Beepers close to you</h2>

						{isLoading && (<Spinner />)}

						{!isLoading && (
							<div className="users">
								{usersDistance.map(user => (
									typeof user !== "undefined" ? <UserItem user={user} key={user.id}/> : ""
								))}
							</div>
						)}

						<hr className="my-2"></hr>

						{usersTags.length > 0 && (<h2 className="center">Beepers with similar interests</h2>)}

						{isLoading && (<div>Loading...</div>)}

						{!isLoading && (
							<div className="users">
								{usersTags.map(user => (
									<UserItem user={user} key={user.id}/>
								))}
							</div>
						)}

						<hr className="my-2"></hr>

						<h2 className="center">Famous Beepers</h2>

						{isLoading && (<div>Loading...</div>)}

						{!isLoading && (
							<div className="users">
								{usersFame.map(user => (
									typeof user !== "undefined" ? <UserItem user={user} key={user.id}/> : ""
								))}
							</div>
						)}
						<hr className="my-2"></hr>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Home;