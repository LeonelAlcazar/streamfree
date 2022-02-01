import React, { useEffect, useState } from "react";
import { GetUserByUsername } from "../actions/get-user-by-username.action";

export function useUserByUsername(username: string) {
	const [user, setUser]: [any, any] = useState(null);

	const updateData = async () => {
		const rawUser = await GetUserByUsername(username);
		setUser(rawUser);
	};

	useEffect(() => {
		updateData();
	}, [username]);

	return [user];
}
