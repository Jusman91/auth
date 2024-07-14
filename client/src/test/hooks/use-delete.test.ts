/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDelete } from '@/hooks';
import { act, renderHook } from '../unit-testing';
import * as storage from '@/lib/utils/storage';

const mockUseDeleteUserMutation = vi.fn();
vi.mock('@/lib/react-query', async () => {
	const mod = await vi.importActual<
		typeof import('@/lib/react-query')
	>('@/lib/react-query');
	return {
		...mod,
		useDeleteUserMutation: () =>
			mockUseDeleteUserMutation(),
	};
});

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

describe('Hooks - useDelete', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const id = 'userId';

	it('should call userDeleted on handleDeleteUser', async () => {
		const mockUserDeleted = vi.fn();
		mockUseDeleteUserMutation.mockReturnValue({
			mutate: mockUserDeleted,
			data: null,
			error: null,
			isPending: false,
			isSuccess: false,
		});

		const { result } = renderHook(useDelete);
		act(() => {
			result.current.handleDeleteUser({
				id,
				navigate: mockedUseNavigate,
			});
		});
		expect(mockUserDeleted).toHaveBeenCalledWith(
			id,
			expect.any(Object),
		);
	});

	it('should clear user and navigate on success', async () => {
		const clearUserSpy = vi.spyOn(
			storage,
			'clearUserInStorage',
		);
		mockUseDeleteUserMutation.mockReturnValue({
			mutate: (_data: any, { onSuccess }: any) => {
				onSuccess();
			},
			data: null,
			error: null,
			isPending: false,
			isSuccess: true,
		});

		const { result } = renderHook(useDelete);
		act(() => {
			result.current.handleDeleteUser({
				id,
				navigate: mockedUseNavigate,
			});
		});

		expect(clearUserSpy).toHaveBeenCalled();
		expect(mockedUseNavigate).toHaveBeenCalledWith(
			'/auth/login',
		);
	});

	it('should handle error on delete failure', async () => {
		mockUseDeleteUserMutation.mockReturnValue({
			mutate: (_data: any, { onError }: any) => {
				onError();
			},
			data: null,
			error: null,
			isPending: false,
			isSuccess: true,
		});

		const { result } = renderHook(useDelete);
		act(() => {
			result.current.handleDeleteUser({
				id,
				navigate: mockedUseNavigate,
			});
		});

		expect(mockedUseNavigate).not.toHaveBeenCalled();
	});
});
