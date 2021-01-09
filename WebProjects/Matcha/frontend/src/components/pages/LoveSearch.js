import React, { useState, useEffect, useContext, useRef, Fragment } from 'react';
import axios from "axios";
import clone from "clone";
import remove from "lodash.remove";
import getDistance from 'geolib/es/getDistance';

import StateContext from "../../context/StateContext";

import UserItem from "./utilities/UserItem";
import Spinner from "../layout/Spinner";

import InfiniteScroll from 'react-infinite-scroll-component';

const LoveSearch = () =>
{
	const globalState = useContext(StateContext);

	const [mainSort, setMainSort] = useState("fame");
	const users = useRef([]);
	const usersAndTags = useRef([]);
	const [usersSorted, setUsersSorted] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [usernameIncludes, setUsernameIncludes] = useState("");
	const [locationIncludes, setLocationIncludes] = useState("");
	const [ageMin, setAgeMin] = useState(18);
	const [ageMax, setAgeMax] = useState(100);
	const [fameMin, setFameMin] = useState(0);
	const [fameMax, setFameMax] = useState(9999);
	const [distanceMin, setDistanceMin] = useState(0);
	const [distanceMax, setDistanceMax] = useState(20000);

	const [genderMale, setGenderMale] = useState(true);
	const [genderFemale, setGenderFemale] = useState(true);
	const [genderOther, setGenderOther] = useState(true);

	const [sexualityHeterosexual, setSexualityHeterosexual] = useState(true);
	const [sexualityHomosexual, setSexualityHomosexual] = useState(true);
	const [sexualityBisexual, setSexualityBisexual] = useState(true);
	const [sexualityAsexual, setSexualityAsexual] = useState(true);
	const [tags, setTags] = useState([]);

	const [numberOfResults, setNumberOfResults] = useState(0);

	const [numberOfPages, setNumberOfPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMoreItems, setHasMoreItems] = useState(true);

	const [items, setItems] = useState([]);

	useEffect(() =>
	{
		(async () =>
		{
			try
			{
				// fetch data of all users
				let usersOriginal = await axios.get('http://localhost:5000/api/users/', globalState.config);

				// fetch logged in user data
				let loggedInUser = await axios.get(`http://localhost:5000/api/users/profile/${globalState.user.id}`, globalState.config);

				// calculate location and distance from logged in user 
				usersOriginal.data.map(user => {
					return (
						user.distance = Math.round(getDistance(
							{ latitude: loggedInUser.data.latitude, longitude: loggedInUser.data.longitude },
							{ latitude: user.latitude, longitude: user.longitude }
						) / 1000)
					)
				});

				// fetch unique tags (and remove tags of current users)
				let allTags = await axios.get("http://localhost:5000/api/tags/unique/", globalState.config); 

				// add column 'checked', value 'true
				for (let i = 0; i < allTags.data.length; i++)
				{
					allTags.data[i].checked = true;
					allTags.data[i].id = i;
				}
				setTags(allTags.data);

				// fetch all tags and their owners
				const tagsAndOwners = await axios.get('http://localhost:5000/api/tags/', globalState.config);

				// filter

				// setUsersAndTags(tagsAndOwners.data);
				usersAndTags.current = tagsAndOwners.data;
				setItems(usersOriginal.data.slice(0, 30));

				if (usersOriginal.data.length < 31)
					setHasMoreItems(false);
				else
					setHasMoreItems(true);

				users.current = usersOriginal.data;
				setUsersSorted(usersOriginal.data);
				setNumberOfResults(usersOriginal.data.length);
				setNumberOfPages(Math.floor(usersOriginal.data.length % 30 === 0 ? usersOriginal.data.length / 30 : usersOriginal.data.length / 30 + 1));

				setIsLoading(false);
			}
			catch (err)
			{
				console.error(err.message);
			}
		}
		)()
	}, [globalState.user.id, globalState.config]);

	useEffect(() =>
	{
		setIsLoading(true);

		(async () =>
		{
			try
			{
				// make a copy of all user data
				// let usersCopy = clone(users);
				let usersCopy = clone(users.current);

				// sort users by fame
				if (mainSort === "fame (descending)")
					usersCopy.sort((a, b) => b.fame - a.fame);
				if (mainSort === "fame (ascending)")
					usersCopy.sort((a, b) => a.fame - b.fame);

				// sort users by age
				if (mainSort === "age (descending)")
					usersCopy.sort((a, b) => b.age - a.age);
				if (mainSort === "age (ascending)")
					usersCopy.sort((a, b) => a.age - b.age);

				// sort users by distance from logged in user
				else if (mainSort === "distance (descending)")
					usersCopy.sort((a, b) => b.distance - a.distance);
				else if (mainSort === "distance (ascending)")
					usersCopy.sort((a, b) => a.distance - b.distance);

				// sort users by username (text input)
				if (usernameIncludes !== "")
					usersCopy = remove(usersCopy, (user) => user.username.toLowerCase().includes(usernameIncludes.toLowerCase()));
				
				// sort user by location (text input)
				if (locationIncludes !== "")
					usersCopy = remove(usersCopy, (user) => user.location.toLowerCase().includes(locationIncludes.toLowerCase()));

				// remove users outside of fame range
				usersCopy = remove(usersCopy, (user) => user.fame >= fameMin);
				usersCopy = remove(usersCopy, (user) => user.fame <= fameMax);

				// remove users outside of age range
				usersCopy = remove(usersCopy, (user) => user.age >= ageMin);
				usersCopy = remove(usersCopy, (user) => user.age <= ageMax);

				// remove users outside of distance range
				usersCopy = remove(usersCopy, (user) => user.distance >= distanceMin);
				usersCopy = remove(usersCopy, (user) => user.distance <= distanceMax);

				// If unchecked, remove users with the corresponding gender
				if (genderMale === false)
						usersCopy = remove(usersCopy, (user) => user.gender !== 1);

				if (genderFemale === false)
						usersCopy = remove(usersCopy, (user) => user.gender !== 2);

				if (genderOther === false)
						usersCopy = remove(usersCopy, (user) => user.gender !== 3);

				// If unchecked, remove users with the corresponding sexuality
				if (sexualityHeterosexual === false)
						usersCopy = remove(usersCopy, (user) => user.sexuality !== 1);

				if (sexualityHomosexual === false)
					usersCopy = remove(usersCopy, (user) => user.sexuality !== 2);

				if (sexualityBisexual === false)
					usersCopy = remove(usersCopy, (user) => user.sexuality !== 3);

				var usersFiltered = [];

				// filter out users who do not have any currently active tags
				for (let i = 0; i < usersCopy.length; i++)
				{
					let userTags = [];

					for (let j = 0; j < usersAndTags.current.length; j++) 
					{
						if (usersAndTags.current[j].owner === usersCopy[i].id)
							userTags.push(usersAndTags.current[j].name);
					}

					let found = false;

					for (let j = 0; j < tags.length; j++)
					{
						if (tags[j].checked)
						{
							if (userTags.indexOf(tags[j].name) > -1)
							{
								found = true;
								break;
							}
						}
					}
					if (found)
						usersFiltered.push(usersCopy[i]);
				}
				setItems(usersFiltered.slice(0, 30));
				setCurrentPage(1);

				if (usersFiltered.length <= 31)
					setHasMoreItems(false);
				else
					setHasMoreItems(true);

				setUsersSorted(usersFiltered);
				setNumberOfResults(usersFiltered.length);
				setNumberOfPages(Math.floor(usersFiltered.length % 30 === 0 ? usersFiltered.length / 30 : usersFiltered.length / 30 + 1));
				setIsLoading(false);
			}
			catch (err)
			{
				console.error(err.message);
			}
		}
	)()
	}, [
		mainSort,
		usernameIncludes,
		locationIncludes,
		ageMin,
		ageMax,
		fameMin,
		fameMax,
		distanceMin,
		distanceMax,
		genderMale,
		genderFemale,
		genderOther,
		sexualityHeterosexual,
		sexualityHomosexual,
		sexualityBisexual,
		sexualityAsexual,
		tags
	]);

	const handleSort = (event) => setMainSort(event.target.value);

	const handleUsernameIncludes = (event) => setUsernameIncludes(event.target.value);
	const handleLocationIncludes = (event) => setLocationIncludes(event.target.value);

	const handleAgeMin = (event) => setAgeMin(event.target.value);
	const handleAgeMax = (event) => setAgeMax(event.target.value);
	const handleFameMin = (event) => setFameMin(event.target.value);
	const handleFameMax = (event) => setFameMax(event.target.value);
	const handleDistanceMin = (event) => setDistanceMin(event.target.value);
	const handleDistanceMax = (event) => setDistanceMax(event.target.value);

	const handleGenderMale = () => genderMale ? setGenderMale(false) : setGenderMale(true);
	const handleGenderFemale = () => genderFemale ? setGenderFemale(false) : setGenderFemale(true);
	const handleGenderOther = () => genderOther ? setGenderOther(false) : setGenderOther(true);

	const handleSexualityHeterosexual = () => sexualityHeterosexual ? setSexualityHeterosexual(false) : setSexualityHeterosexual(true);
	const handleSexualityHomosexual = () => sexualityHomosexual ? setSexualityHomosexual(false) : setSexualityHomosexual(true);
	const handleSexualityBisexual = () => sexualityBisexual ? setSexualityBisexual(false) : setSexualityBisexual(true);

	const handleTags = (event) =>
	{
		let tagsCopy = clone(tags);
		for (let i = 0; i < tagsCopy.length; i++)
		{
			if (Number(event.target.value) === tagsCopy[i].id)
				tagsCopy[i].checked = tagsCopy[i].checked ? false : true;
		}
		setTags(tagsCopy);
	};

	const handleClear = () =>
	{
		setUsernameIncludes("");
		setLocationIncludes("");
		setAgeMin(18);
		setAgeMax(100);
		setFameMin(0);
		setFameMax(9999);
		setDistanceMin(0);
		setDistanceMax(20000);
		setGenderMale(true);
		setGenderFemale(true);
		setGenderOther(true);
		setSexualityHeterosexual(true);
		setSexualityHomosexual(true);
		setSexualityBisexual(true);
		setSexualityAsexual(true);
		let tagsCopy = clone(tags);
		for (let i = 0; i < tagsCopy.length; i++)
			tagsCopy[i].checked = true;
		setTags(tagsCopy);
	};

	const handleLoadMore = () =>
	{
		let usersSortedCopy = clone(usersSorted).slice(0, (currentPage + 1) * 30);
		setItems(usersSortedCopy);
		currentPage + 1 < numberOfPages ? setHasMoreItems(true) : setHasMoreItems(false);
		setCurrentPage(currentPage + 1)
	};

	return (
		<main>
			<div className="lovesearch">
				<div className="search-column">
				<h1><i className="fas fa-heart color-dark"></i> LoveSearch™</h1>

					<div className="flex">
						<label>Username</label>
						<div style={{width: "100%"}}>
							<input type="text" id="username" name="username" value={usernameIncludes} onChange={handleUsernameIncludes}/>
						</div>
					</div>

					<hr className="my-4"></hr>

					<div className="flex">
						<label>Location</label>

						<div style={{width: "100%"}}>
							<input type="text" id="location" name="location" value={locationIncludes} onChange={handleLocationIncludes}/>
						</div>
					</div>

					<hr className="my-4"></hr>

					<div>
						<label>Age</label>
						<div className="flex-space-evenly">
							<div style={{width: "6rem"}}>
								<label className="small pl-3">Min</label>
								<input type="number" id="age" name="age" min="18" max={ageMax} value={ageMin} onChange={handleAgeMin}/>
							</div>
							<div style={{width: "6rem"}}>
								<label className="small pl-3">Max</label>
								<input type="number" id="age" name="age" min={ageMin} max="100" value={ageMax} onChange={handleAgeMax}/>
							</div>
						</div>
					</div>

					<hr className="my-4"></hr>

					<div>
						<label>Fame</label>
						<div className="flex-space-evenly">
							<div style={{width: "6rem"}}>
								<label className="small pl-3">Min</label>
								<input type="number" id="fame" name="fame" min="0" max={fameMax} value={fameMin} onChange={handleFameMin}/>
							</div>
							<div style={{width: "6rem"}}>
								<label className="small pl-3">Max</label>
								<input type="number" id="fame" name="fame" min={fameMin} max="9999" value={fameMax} onChange={handleFameMax}/>
							</div>
						</div>
					</div>

					<hr className="my-4"></hr>

					<div>
						<label>Distance</label>
						<div className="flex-space-evenly">
							<div style={{width: "6rem"}}>
								<label className="small pl-3">Min (km)</label>
								<input type="number" id="distance" name="distance" min="0" max={distanceMax} value={distanceMin} onChange={handleDistanceMin}/>
							</div>
							<div style={{width: "6rem"}}>
								<label className="small pl-3">Max (km)</label>
								<input type="number" id="distance" name="distance" min={distanceMin} max="30000" value={distanceMax} onChange={handleDistanceMax}/>
							</div>
						</div>
					</div>

					<hr className="my-4"></hr>

					<div>
						<label>Gender</label>
						<div className="flex-left">
							<input style={{width: "initial"}} type="checkbox" id="male" name="male" checked={genderMale} onChange={handleGenderMale}/>
							<div>Male</div>
						</div>
						<div className="flex-left">
							<input style={{width: "initial"}} type="checkbox" id="female" name="female" checked={genderFemale} onChange={handleGenderFemale}/>
							<div>Female</div>
						</div>
						<div className="flex-left">
							<input style={{width: "initial"}} type="checkbox" id="other" name="other" checked={genderOther} onChange={handleGenderOther}/>
							<div>Other</div>
						</div>
					</div>

					<hr className="my-4"></hr>

					<div>
						<label>Sexual Preference</label>
						<div className="flex-left">
							<input style={{width: "initial"}} type="checkbox" id="heterosexual" name="heterosexual" checked={sexualityHeterosexual} onChange={handleSexualityHeterosexual}/>
							<div>Heterosexual</div>
						</div>
						<div className="flex-left">
							<input style={{width: "initial"}} type="checkbox" id="homosexual" name="homosexual" checked={sexualityHomosexual} onChange={handleSexualityHomosexual}/>
							<div>Homosexual</div>
						</div>
						<div className="flex-left">
							<input style={{width: "initial"}} type="checkbox" id="bisexual" name="bisexual" checked={sexualityBisexual} onChange={handleSexualityBisexual}/>
							<div>Bisexual</div>
						</div>
					</div>

					<hr className="my-4"></hr>

					<div>
						<label>Active Tags</label>
						<div className="small mb-1">
							Click to deactivate.
						</div>
						<div>
							{tags.map(tag => (
								tag.checked && (
									<button
										key={tag.id}
										className="tag-active"
										id={tag.name}
										checked={tag.checked}
										title={"Remove " + tag.name.toUpperCase()}
										value={tag.id}
										onClick={handleTags}>
											{tag.name} {tag.count}
									</button>
								)
							))}
						</div>
					</div>

					<hr className="my-4"></hr>

					<div>
						{tags.length > 0 && (
							<Fragment>
								<label>Inactive Tags</label>
								<div className="small mb-1">
									Click to activate.
								</div>
							</Fragment>
						)}
						<div>
							{tags.map(tag => (
								!tag.checked && (
									<button
										key={tag.id}
										className="tag-unused"
										id={tag.name}
										checked={tag.checked}
										title={"Add " + tag.name.toUpperCase()}
										value={tag.id}
										onClick={handleTags}>
											{tag.name} {tag.count}
									</button>
								)
							))}
						</div>
					</div>

					<hr className="my-4"></hr>

					<div className="center">
						<button onClick={handleClear}>Reset All</button>
					</div>

				</div>
				<div className="results-column">
					<div className="flex">
						<div className="mx-1 mb-1">
							<div className="small">
								Results have been prefiltered based on your profile information.
							</div>
						</div>
						<div className="mx-1 mb-1">
							<h4>{numberOfResults} results</h4>
						</div>
						<div className="mx-1 mb-1">
							<label>Sort by:</label>
							<select name="sort" id="sort" defaultValue={mainSort} onChange={handleSort}>
								<option value="fame (descending)">fame (descending)</option>
								<option value="fame (ascending)">fame (ascending)</option>
								<option value="distance (descending)">distance (descending)</option>
								<option value="distance (ascending)">distance (ascending)</option>
								<option value="age (descending)">age (descending)</option>
								<option value="age (ascending)">age (ascending)</option>
							</select>
						</div>
					</div>

					{isLoading && (<Spinner />)}

					{!isLoading && (
						<InfiniteScroll
							dataLength={items.length}
							next={handleLoadMore}
							hasMore={hasMoreItems}
							loader={<Spinner />}
							>
							<div className="users">
								{items.map(user => (
									<UserItem user={user} key={user.id}/>
								))}
							</div>
						</InfiniteScroll>
					)}
				</div>
			</div>
		</main>
	)
}

export default LoveSearch;