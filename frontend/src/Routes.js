import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";

export default function Links() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			{/* Finally, catch all unmatched routes */}
			<Route path="*" element={<NotFound />} />;
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/notes/new" element={<NewNote />} />
			<Route path="/notes/:id" element={<Notes />} />
		</Routes>
	);
}
