import axios from 'axios';
import {
	clearUserInStorage,
	getAccessTokenInStorage,
} from '../utils/storage';

const axiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}`,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use((req) => {
	const accessToken = getAccessTokenInStorage();
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
			clearUserInStorage();
			window.location.href = '/auth/token-expired';
		}
		return Promise.reject(error);
	},
);

export default axiosInstance;
