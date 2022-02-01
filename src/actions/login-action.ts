import axios from "axios";
import config from "../config";
const endpoint = `${config.API_ENDPOINT}/auth`;

export async function Login(email: string, password: string) {
	try {
		const response = await axios.get(`${endpoint}/`, {
			auth: { username: email, password: password },
		});
		console.log(response);
		const token = <string>response.data.body;
		return token;
	} catch (e) {
		throw e;
	}
}
