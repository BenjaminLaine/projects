import React, { useEffect, useState, useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from "axios";

import StateContext from "../../context/StateContext";

import LocationPin from "./utilities/LocationPin";

const Map = () =>
{
	const globalState = useContext(StateContext);

	const [users, setUsers] = useState([]);
	const [mapCenter, setMapCenter] = useState([]);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() =>
	{
		(async () =>
		{
			try
			{
				// fetch all users
				const allUsers = await axios.get('http://localhost:5000/api/users/nonfiltered', globalState.config);
				setUsers(allUsers.data);

				// fetch data of logged in user
				const loggedInUser = await axios.get('http://localhost:5000/api/users/private', globalState.config);

				setMapCenter(
					{
						lat: loggedInUser.data.latitude,
						lng: loggedInUser.data.longitude
					}
				);
				setIsLoading(false);
			}
			catch (err)
			{
				console.error(err.message);
			}
		})();
	}, [globalState.config]);

	return (
		<main>
			<div className="box border-dark mx-2 p-5 center">
				<h1 className="mb-4"><i className="fas fa-globe-americas color-dark"></i> Map</h1>
				<div style={{ height: '70vh', width: '100%', border: 'solid 1px #ccc' }}>

					{!isLoading && (<GoogleMapReact
						bootstrapURLKeys={{ key: "AIzaSyAReoWkKPG5sQKg8Z7zF8fjCXXwU_67UXs" }}
						defaultCenter={mapCenter}
						defaultZoom={8}
					>
						{users.map(user => (
							<LocationPin lat={user.latitude} lng={user.longitude} user={user} key={user.id}/>
						))}
					</GoogleMapReact>)}
				</div>
			</div>
		</main>
	)
}

export default Map;