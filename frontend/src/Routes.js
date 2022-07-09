import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";

export default function Links() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			{/* Finally, catch all unmatched routes */}
			<Route path="*" element={<NotFound />} />;
			<Route path="/login" element={<Login />} />
		</Routes>
	);
}
