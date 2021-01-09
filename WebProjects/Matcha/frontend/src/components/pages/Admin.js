import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import clone from "clone";
import remove from "lodash.remove";

import StateContext from "../../context/StateContext";
import DispatchContext from '../../context/DispatchContext';

import Spinner from "../layout/Spinner";

import convertTime from "../functions/convertTime";

const Admin = () =>
{
	const globalState = useContext(StateContext);
	const globalDispatch = useContext(DispatchContext);

	const [reports, setReports] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isAdmin, setIsAdmin] = useState(true);

	useEffect(() =>
	{
		(async () =>
		{
			try
			{
				// check if admin
				const admin = await axios.get('http://localhost:5000/api/users/private', globalState.config);
				
				if (admin.data.admin === true)
				{
					setIsAdmin(true);
					
					// fetch all users
					const users = await axios.get('http://localhost:5000/api/users/nonfiltered', globalState.config);
					
					// fetch all reports
					const response = await axios.get('http://localhost:5000/api/reports/list/', globalState.config);
					
					// add corresponding usernames to the list
					for (let i = 0; response.data[i]; i++)
					{
						for (let j = 0; users.data[j]; j++)
						{
							if (response.data[i].sender === users.data[j].id)
							response.data[i].sender_username = users.data[j].username;
							else if (response.data[i].recipient === users.data[j].id)
							response.data[i].recipient_username = users.data[j].username;
						}
					}
					
					setReports(response.data);
					setIsLoading(false);
				}
				else
					setIsAdmin(false);
				}
			catch (err)
			{
				console.error(err.message);
			}
		})();
	}, [globalState.config]);

	const onSubmit = async () =>
	{
		try
		{
			await axios.post('http://localhost:5000/api/users/random', globalState.config);

			globalDispatch({ type: "successMessage", value: "100 Random users created" })
		}
		catch (err)
		{
			console.error(err.message);
		}
	}

	const deleteReport = async (id) =>
	{
		try
		{
			await axios.delete(`http://localhost:5000/api/reports/${id}`, globalState.config);

			let reportsNew = clone(reports);
			reportsNew = remove(reportsNew, (data) => data.id !== id)
			setReports(reportsNew);
		}
		catch (err)
		{
			console.error(err.message);
		}
	}

	const deleteAllReports = async () =>
	{
		try
		{
			await axios.delete("http://localhost:5000/api/reports", globalState.config);

			setReports([]);
		}
		catch (err)
		{
			console.error(err.message);
		}
	}

	return (
		<main>
			{!isAdmin && (<Redirect to="/" />)}
			{isLoading && (<Spinner />)}
			{!isLoading && (
			<div className="box border-dark clamp-700 m-a p-5">
				<h1 className="center"><i className="fas fa-user-lock color-dark mb-4"></i> Admin</h1>
				<div className="center">
					<button onClick={onSubmit}>Create 100 Random Users</button>
				</div>

				<hr className="my-4"></hr>

				<h3 className="center">Reports</h3>
				<table id="notifications">
					<tbody> 
						{!isLoading && (reports.length > 0 && (
						<tr>
							<td width="100%">
								<div className="right">
									Delete all
								</div>
							</td>
							<td>
								<button className="button-trash" onClick={() => deleteAllReports()} title="Delete All">
									<i className="fas fa-trash-alt color-black100"></i>
								</button>
							</td>																		
						</tr>
						))}

						<tr>
							<td colSpan="4">
								<hr className="my-1"></hr>
							</td>
						</tr>

						{!isLoading && (reports.map(row => (
							<Fragment key={row.id}>
								<tr>
									<td width="100%">
										{row.new ? <i className="fas fa-flag color-error"></i> : <i className="fas fa-flag color-light"></i>}
										<span> </span><Link to={"/profile/" + row.sender}>{row.sender_username}</Link> reported <Link to={"/profile/" + row.recipient}>{row.recipient_username}</Link> on {convertTime(row.created)}.
									</td>
									<td>
										<button className="button-trash" onClick={() => deleteReport(row.id)} title="Delete">
											<i className="fas fa-trash-alt color-gray"></i>
										</button>
									</td>																		
								</tr>
							</Fragment>)
						))}		
					</tbody>
				</table>
			</div>)}
		</main>
	)
}

export default Admin;