import React, { cloneElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

function querystring(name, url = window.location.href) {
	name = name.replace(/[[]]/g, "\\$&");

	const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
	const results = regex.exec(url);

	if (!results) {
		return null;
	}
	if (!results[2]) {
		return "";
	}

	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default function UnauthenticatedRoute(props) {
	const { isAuthenticated } = useAppContext();
	const { children } = props;
	const redirect = querystring("redirect");

	if (isAuthenticated) {
		return <Navigate to={redirect || "/"} />;
	}

	return cloneElement(children, props);
}
