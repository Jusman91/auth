import axios from 'axios';
import {
	clearUserInStorage,
	getAccessTokenInStorage,
} from '../utils/storage';
import { VITE_API_URL } from '@/env';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
	baseURL: `${VITE_API_URL}`,
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
			const navigate = useNavigate();
			navigate('/auth/token-expired');
		}
		return Promise.reject(error);
	},
);

export default axiosInstance;
