import React, { useEffect, useState } from "react";
import { ListStreams } from "../actions/list-streams-action";

export function useStreams() {
	const [streams, setStreams]: [any[], any] = useState([]);

	const updateData = async () => {
		const rawStreams = await ListStreams();
		setStreams(rawStreams);
	};

	useEffect(() => {
		updateData();
	}, []);

	return [streams];
}
