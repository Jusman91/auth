import { VITE_API_URL } from '@/env';
import { axiosInstance } from '@/lib/axios';
import * as storage from '@/lib/utils/storage';
import MockAdapter from 'axios-mock-adapter';
const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
	const mod = await vi.importActual<
		typeof import('react-router-dom')
	>('react-router-dom');
	return {
		...mod,
		useNavigate: () => mockedUseNavigate,
	};
});
const mock = new MockAdapter(axiosInstance);
describe('Lib - Axios', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});
	afterEach(() => {
		mock.reset();
	});

	it('should set base URL and headers correctly', () => {
		const URL = axiosInstance.defaults.baseURL;
		const headers =
			axiosInstance.defaults.headers['Content-Type'];

		expect(URL).toBe(`${VITE_API_URL}`);
		expect(headers).toBe('application/json');
	});

	it('should add Authorization header if access token exists', async () => {
		const token = 'mockToken';
		vi.spyOn(
			storage,
			'getAccessTokenInStorage',
		).mockReturnValue(token);
		// arguments for reply are (status, data, headers)
		mock.onGet('/test').reply(200);
		await axiosInstance.get('/test');
		const Authorization =
			mock.history.get[0].headers?.Authorization;

		expect(Authorization).toBe(`Bearer ${token}`);
	});

	it('should not add Authorization header if access token not exists', async () => {
		vi.spyOn(
			storage,
			'getAccessTokenInStorage',
		).mockReturnValue(null);
		// arguments for reply are (status, data, headers)
		mock.onGet('/test').reply(200);
		await axiosInstance.get('/test');
		const Authorization =
			mock.history.get[0].headers?.Authorization;

		expect(Authorization).toBeUndefined();
	});

	it('should clear user in storage and if response status 401', async () => {
		mock.onGet('/test').reply(401);

		const clearSpy = vi.spyOn(
			storage,
			'clearUserInStorage',
		);

		try {
			await axiosInstance.get('/test');
		} catch (error) {
			expect(clearSpy).toHaveBeenCalled();
			expect(mockedUseNavigate).toHaveBeenCalledWith(
				'/auth/token-expired',
			);
		}
	});
});
