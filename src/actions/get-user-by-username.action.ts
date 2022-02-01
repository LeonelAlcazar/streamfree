import axios from "axios";
import Cookies from "js-cookie";
import config from "../config";
const endpoint = `${config.API_ENDPOINT}/user`;

export async function GetUserByUsername(username: string) {
	try {
		const token = Cookies.get("sessionToken");
		const response = await axios.get(
			`${endpoint}/query?username=${username}`,
			{
				headers: { authorization: `BEARER ${token}` },
			}
		);
		const user = response.data.body;
		return user;
	} catch (e) {
		throw e;
	}
}
