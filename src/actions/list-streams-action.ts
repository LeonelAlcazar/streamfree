import axios from "axios";
import config from "../config";
const endpoint = `${config.API_ENDPOINT}/stream`;

export async function ListStreams() {
	try {
		const response = await axios.get(`${endpoint}/`);
		const streams = <any[]>response.data.body;
		return streams;
	} catch (e) {
		throw e;
	}
}
