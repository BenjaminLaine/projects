import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import ReactFileReader from 'react-file-reader';

import StateContext from "../../../context/StateContext";
import DispatchContext from '../../../context/DispatchContext';

const ProfileGallery = ({ id }) =>
{
	const globalState = useContext(StateContext);
	const globalDispatch = useContext(DispatchContext);
	const [image, setImage] = useState("");
	const [gallery, setGallery] = useState([]);
	const [numberOfImages, setNumberOfImages] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() =>
	{
		(async () =>
		{
			try
			{
				// get images
				const response = await axios.post('http://localhost:5000/api/images/gallery', { owner: id });

				setNumberOfImages(response.data.length);

				setGallery(response.data);
				setIsLoading(false);
			}
			catch (err)
			{
				console.error(err.message);
			}
		}
		)()
	}, [id]);

	// assign JS object base64 file to state variable
	const handleFiles = async (files) =>
	{
		// calculate image size
		if (files.base64.length * 0.75 < 2000000)
			setImage(files.base64);
		else
			globalDispatch({ type: "errorMessage", value: "Failed to upload image. Maximum file size is 2MB." })
	}


	// send base64 file to backend
	const saveImage = async () =>
	{
		try
		{
			// let response = await axios.post('http://localhost:5000/api/images/gallery', { owner: id });

			await axios.post('http://localhost:5000/api/images/upload', { image: image }, globalState.config);

			setNumberOfImages(numberOfImages + 1);
			setImage("");

			// refresh gallery
			const response = await axios.post('http://localhost:5000/api/images/gallery', { owner: id });	
			setGallery(response.data);

			globalDispatch({ type: "successMessage", value: `Image saved` })
		}
		catch (err)
		{
			console.error(err.message);
		}
	}

	const setProfileImage = async (name) =>
	{
		try
		{
			await axios.post('http://localhost:5000/api/images/setprofile', { name: name }, globalState.config);

			globalDispatch({ type: "changeProfileImage", value: name });

		}
		catch (err)
		{
			console.error(err.message);
		}
	}

	const deleteImage = async (name) =>
	{
		try
		{
			const newName = name.substr(22);

			// delete image from database
			await axios.delete(`http://localhost:5000/api/images/${newName}`, globalState.config);
			globalDispatch({ type: "successMessage", value: "image deleted" })

			// if deleted image is current profile image, set profile image back to default
			if (globalState.user.profileImage === name)
			{
				globalDispatch({ type: "changeProfileImage", value: "http://localhost:5000/default.jpg" });
				await axios.post('http://localhost:5000/api/images/setprofile', { name: "http://localhost:5000/default.jpg", username: globalState.user.username }, globalState.config);
				globalDispatch({ type: "successMessage", value: "profile image set back to default" })
			}

			setNumberOfImages(numberOfImages - 1);

			// refresh gallery
			const response = await axios.post('http://localhost:5000/api/images/gallery', { owner: id });	
			setGallery(response.data);
		}
		catch (err)
		{
			console.error(err.message);
		}
	}

	return (
		<div className="center">
			<h1>Gallery</h1>
			<div className="flex-center">
				{numberOfImages === 5 && (
					<button className="button-disabled m-2">Upload Image</button>
				)}
				{numberOfImages < 5 && (
					<ReactFileReader base64={true} handleFiles={handleFiles}>
						<button className="m-2">Upload Image</button>
					</ReactFileReader>
				)}
				{image === "" && (
					<button className="button-disabled m-2">Save Image</button>
				)}
				{image !== "" && (
					<button className="m-2" onClick={saveImage}>Save Image</button>
				)}
			</div>
			{image !== "" && (
			<div className="image-preview">
				<p>Preview</p>
				<img src={image} alt="Preview"/>
			</div>
			)}
			{numberOfImages < 4 && (
				<p>Your gallery has room for {5 - numberOfImages} more images</p>
			)}
			{numberOfImages === 4 && (
				<p>Your gallery has room for 1 more image</p>
			)}
			{numberOfImages === 5 && (
				<p>Your gallery is full.</p>
			)}
			{isLoading && (<div>Loading...</div>)}

			{!isLoading && (
				<div>
					{gallery.map(row => (
						<div className="gallery-canvas" key={row.id}>
							<div className="flex">
									<button className="button-trash" onClick={() => setProfileImage(row.name)} title="Set Profile Image">
										<span className="small color-light">SET AS PROFILE PICTURE</span> <i className="fas fa-user color-info"></i>
									</button>
									<button className="button-trash" onClick={() => deleteImage(row.name)} title="Delete">
									<span className="small color-light">DELETE</span> <i className="fas fa-trash-alt color-error"></i>
									</button>
							</div>
							<img className="gallery-image" src={row.name} alt="Gallery"></img>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default ProfileGallery;