import axios from "axios";

const BACKEND_URL = "https://api.trello.com/1";

export const AuthorizedApi = axios.create({
	baseURL: BACKEND_URL,
	headers: {
		"Content-Type": "application/json",
	},
	params: {
		key: "03c19ecc280aa040fda38dc899378fc8",
		token: "ATTA6c3e4190d43d3d8544603fb1f0f23c20922945dc991483b744d3a208417ab876839520BF",
	},
});

// AuthorizedApi.interceptors.request.use(config => {
// 	// Modify the request config
// 	config.params.token = JSON.parse(localStorage.getItem("settings"))?.settings?.token;
//   return config;
// });
