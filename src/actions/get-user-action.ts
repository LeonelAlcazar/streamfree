import axios from "axios";
import Cookies from "js-cookie";
import config from "../config";
const endpoint = `${config.API_ENDPOINT}/user`;
export async function GetUser(id: string) {
	try {
		const token = Cookies.get("sessionToken");
		const response = await axios.get(`${endpoint}/${id}`, {
			headers: { authorization: `BEARER ${token}` },
		});
		const user = response.data.body;
		return user;
	} catch (e) {
		throw e;
	}
}
