/* eslint-disable @typescript-eslint/no-explicit-any */
import { useResetPassword } from '@/hooks';
import { act, renderHook } from '../unit-testing';
import { AxiosError } from 'axios';

const mockUseResetPasswordMutation = vi.fn();
vi.mock('@/lib/react-query', async () => {
	const mod = await vi.importActual<
		typeof import('@/lib/react-query')
	>('@/lib/react-query');
	return {
		...mod,
		useResetPasswordMutation: () =>
			mockUseResetPasswordMutation(),
	};
});

describe('Hooks - useResetPassword', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const openModal = vi.fn();
	const fields = {
		password: 'password123',
		confirmPassword: 'password123',
	};
	const token = 'fakeToken';
	const id = 'fakeId';

	it('should call userResetPassword on handleResetPassword', async () => {
		const mockMutate = vi.fn();
		mockUseResetPasswordMutation.mockReturnValue({
			mutate: mockMutate,
			data: null,
			error: null,
			isPending: false,
			isSuccess: false,
		});
		const { result } = renderHook(useResetPassword);

		act(() => {
			result.current.handleResetPassword({
				formFields: fields,
				openModal,
				id,
				token,
			});
		});

		expect(mockMutate).toHaveBeenCalledWith(
			{ formFields: fields, id, token },
			expect.any(Object),
		);
	});

	it('should call openModal on success', async () => {
		mockUseResetPasswordMutation.mockReturnValue({
			mutate: (_data: any, { onSuccess }: any) => {
				onSuccess();
			},
			data: null,
			error: null,
			isPending: false,
			isSuccess: true,
		});

		const { result } = renderHook(useResetPassword);

		act(() => {
			result.current.handleResetPassword({
				formFields: fields,
				openModal,
				id,
				token,
			});
		});

		expect(openModal).toHaveBeenCalled();
	});

	it('should handle error properly', async () => {
		const errorResponse = {
			isAxiosError: true,
			status: 403,
		} as AxiosError;
		mockUseResetPasswordMutation.mockReturnValue({
			mutate: (_data: any, { onError }: any) => {
				onError(errorResponse);
			},
			data: null,
			error: 'error',
			isPending: false,
			isSuccess: true,
		});

		const { result } = renderHook(useResetPassword);

		act(() => {
			result.current.handleResetPassword({
				formFields: fields,
				openModal,
				id,
				token,
			});
		});

		expect(openModal).toHaveBeenCalled();
	});

	it('should not open modal on 401 error', async () => {
		const errorResponse = {
			isAxiosError: true,
			status: 401,
		} as AxiosError;
		mockUseResetPasswordMutation.mockReturnValue({
			mutate: (_data: any, { onError }: any) => {
				onError(errorResponse);
			},
			data: null,
			error: 'error',
			isPending: false,
			isSuccess: true,
		});

		const { result } = renderHook(useResetPassword);

		act(() => {
			result.current.handleResetPassword({
				formFields: fields,
				openModal,
				id,
				token,
			});
		});

		expect(openModal).not.toHaveBeenCalled();
	});
});
