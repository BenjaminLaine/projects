import React from "react";

const ErrorMessage = (props) =>
{
	return (
		<div className="floating-alerts">
			{props.messages.map((message, index) =>
			{
				return (
					<div key={index} className="alert alert-error floating-alert">
						<i className="fas fa-times color-error"></i> {message}
					</div>
				)
			})}
		</div>
	)
}

export default ErrorMessage;