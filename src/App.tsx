import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	BrowserRouter,
} from "react-router-dom";
import { Home } from "./screens/Home";
import { Header } from "./components/Header";
import ModalsProvider from "./providers/ModalsProvider";
import AuthProvider from "./providers/AuthProvider";
import { User } from "./screens/User";

function App() {
	const [count, setCount] = useState(0);

	return (
		<BrowserRouter>
			<AuthProvider>
				<ModalsProvider>
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/u/:username" element={<User />} />
					</Routes>
				</ModalsProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
