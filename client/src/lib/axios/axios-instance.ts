import axios from 'axios';
import {
	clearUser,
	getAccessToken,
} from '../utils/local-storage';

const axiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}`,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use((req) => {
	const accessToken = getAccessToken();
	if (accessToken) {
		req.headers.Authorization = `Bearer ${accessToken}`;
	}
	return req;
});

axiosInstance.interceptors.response.use(
	(res) => {
		return res;
	},
	(error) => {
		if (error.response && error.response.status === 401) {
			clearUser();
			window.location.href = '/authentication/login';
		}
		return Promise.reject(error);
	},
);

export default axiosInstance;
