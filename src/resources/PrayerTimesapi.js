import axios from "axios";

const url = "https://api.waktusolat.app/v2/solat/";

export const getPrayerTimes = async (kodtempat) => {
	try{
		const {data} = await axios.get(`${url}${kodtempat}`);
		return data;
	} catch(error) {
		throw error;
	}
}