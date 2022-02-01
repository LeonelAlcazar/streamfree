import axios from "axios";
import Cookies from "js-cookie";
import config from "../config";
const endpoint = `${config.API_ENDPOINT}/user`;
export async function RegisterUser(userData: any) {
	try {
		const response = await axios.post(`${endpoint}`, userData);
		const user = response.data.body;
		return user;
	} catch (e) {
		throw e;
	}
}
