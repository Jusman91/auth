import { IUser } from '@/types';
import { act, renderHook } from '../unit-testing';
import { useLoggedIn } from '@/hooks';
import * as storage from '@/lib/utils/storage';
const mockUseLoggedInQuery = vi.fn();

vi.mock('@/lib/react-query', async () => {
	const mod = await vi.importActual<
		typeof import('@/lib/react-query')
	>('@/lib/react-query');
	return {
		...mod,
		useLoggedInQuery: () => mockUseLoggedInQuery(),
	};
});
describe('Hooks - useLoggedIn', () => {
	const mockRefetch = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		mockUseLoggedInQuery.mockReturnValue({
			refetch: mockRefetch,
		});
	});

	const user: IUser = {
		id: 'userId',
		username: 'userName',
		email: 'example@example.com',
		profilePic: '',
		role: 'user',
		createdAt: '2024-07-11T00:00:00.000Z',
		updatedAt: '2024-07-11T00:00:00.000Z',
		__v: 0,
	};
	const fields = {
		email: 'testuser@example.com',
		password: 'password123',
		rememberMe: true,
	};

	it('should save authenticated and user to storage on success', async () => {
		mockRefetch.mockResolvedValue({ data: user });
		const saveUserSpy = vi.spyOn(
			storage,
			'saveUserToStorage',
		);
		const saveAuthenticatedSpy = vi.spyOn(
			storage,
			'saveAuthenticatedToStorage',
		);
		const { result } = renderHook(useLoggedIn);
		await act(async () => {
			await result.current.handleLoggedIn({
				formFields: fields,
			});
		});

		expect(saveUserSpy).toHaveBeenCalledWith({
			user,
			rememberMe: true,
		});
		expect(saveAuthenticatedSpy).toHaveBeenCalledWith({
			authenticated: true,
			rememberMe: true,
		});
	});

	it('should handle error if refetch fails', async () => {
		mockRefetch.mockRejectedValue(
			new Error('Fetch failed'),
		);

		const { result } = renderHook(useLoggedIn);

		await expect(
			act(async () => {
				await result.current.handleLoggedIn({
					formFields: fields,
				});
			}),
		).rejects.toThrow('Fetch failed');
	});
});
