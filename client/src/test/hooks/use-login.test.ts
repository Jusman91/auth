import * as storage from '@/lib/utils/storage';
import { act, renderHook, waitFor } from '../unit-testing';
import * as hooks from '@/hooks';

const mockUseLoginMutation = vi.fn();
vi.mock('@/lib/react-query', async () => {
	const mod = await vi.importActual<
		typeof import('@/lib/react-query')
	>('@/lib/react-query');
	return {
		...mod,
		useLoginMutation: () => mockUseLoginMutation(),
		useLoggedInQuery: vi.fn().mockReturnValue({
			refetch: vi.fn().mockReturnValue({
				data: {},
			}),
		}),
	};
});

describe('Hooks - useLogin', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const openModal = vi.fn();
	const fields = {
		email: 'testuser@example.com',
		password: 'password123',
		rememberMe: true,
	};

	it('should call userLogin on handleLogin', async () => {
		const mockMutate = vi.fn();
		mockUseLoginMutation.mockReturnValue({
			mutate: mockMutate,
			data: null,
			error: null,
			isPending: false,
			isSuccess: false,
		});
		const { result } = renderHook(hooks.useLogin);

		act(() => {
			result.current.handleLogin({
				formFields: fields,
				openModal,
			});
		});

		expect(mockMutate).toHaveBeenCalledWith(
			fields,
			expect.any(Object),
		);
	});

	it('should save access token if handleLoggedIn on success', async () => {
		const mockResponse = { accessToken: 'fakeAccessToken' };
		const mockMutate = vi.fn();
		mockUseLoginMutation.mockReturnValue({
			mutate: mockMutate,

			data: null,
			error: null,
			isPending: false,
			isSuccess: false,
		});
		mockMutate.mockImplementation(
			(_formFields, { onSuccess }) => {
				onSuccess(mockResponse);
			},
		);
		const saveSpy = vi.spyOn(
			storage,
			'saveAccessTokenToStorage',
		);
		const mockHandleLoggedIn = vi.fn();
		vi.spyOn(hooks, 'useLoggedIn').mockReturnValue({
			handleLoggedIn: mockHandleLoggedIn,
		});

		const { result } = renderHook(() => hooks.useLogin());
		await act(async () => {
			result.current.handleLogin({
				formFields: fields,
				openModal,
			});
		});

		expect(saveSpy).toHaveBeenCalledWith({
			accessToken: 'fakeAccessToken',
			rememberMe: true,
		});
		waitFor(async () => {
			expect(mockHandleLoggedIn).toHaveBeenCalled();
			expect(openModal).toHaveBeenCalled();
		});
	});

	it('should handle error on login failure', async () => {
		const mockError = new Error('Login failed');
		const mockMutate = vi.fn();
		mockUseLoginMutation.mockReturnValue({
			mutate: mockMutate,

			data: null,
			error: null,
			isPending: false,
			isSuccess: false,
		});
		mockMutate.mockImplementation(
			(_formFields, { onError }) => {
				onError(mockError);
			},
		);
		const saveSpy = vi.spyOn(
			storage,
			'saveAccessTokenToStorage',
		);

		const mockHandleLoggedIn = vi.fn();
		vi.spyOn(hooks, 'useLoggedIn').mockReturnValue({
			handleLoggedIn: mockHandleLoggedIn,
		});

		const { result } = renderHook(hooks.useLogin);

		await act(async () => {
			result.current.handleLogin({
				formFields: fields,
				openModal,
			});
		});

		expect(openModal).toHaveBeenCalled();
		expect(saveSpy).not.toHaveBeenCalled();
		expect(mockHandleLoggedIn).not.toHaveBeenCalled();
	});
});
