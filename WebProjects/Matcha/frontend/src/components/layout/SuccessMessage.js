import React from "react";

const SuccessMessage = (props) =>
{
	return (
		<div className="floating-alerts">
			{props.messages.map((message, index) =>
			{
				return (
					<div key={index} className="alert alert-success floating-alert">
						<i className="fas fa-check color-success"></i> {message}
					</div>
				)
			})}
		</div>
	)
}

export default SuccessMessage;