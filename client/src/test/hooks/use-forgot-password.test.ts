/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForgotPassword } from '@/hooks';
import { act, renderHook } from '../unit-testing';

const mockUseForgotPasswordMutation = vi.fn();
vi.mock('@/lib/react-query', async () => {
	const mod = await vi.importActual<
		typeof import('@/lib/react-query')
	>('@/lib/react-query');
	return {
		...mod,
		useForgotPasswordMutation: () =>
			mockUseForgotPasswordMutation(),
	};
});

describe('Hooks - useForgotPassword', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const openModal = vi.fn();
	const fields = {
		email: 'testuser@example.com',
	};

	it('should call sendRequest on handleForgotPassword', async () => {
		const mockMutate = vi.fn();
		mockUseForgotPasswordMutation.mockReturnValue({
			mutate: mockMutate,
			data: null,
			error: null,
			isPending: false,
			isSuccess: false,
		});
		const { result } = renderHook(useForgotPassword);

		await act(async () => {
			result.current.handleForgotPassword({
				formFields: fields,
				openModal,
			});
		});

		expect(mockMutate).toHaveBeenCalledWith(
			fields,
			expect.any(Object),
		);
	});

	it('should call openModal on success', async () => {
		mockUseForgotPasswordMutation.mockReturnValue({
			mutate: (_data: any, { onSuccess }: any) => {
				onSuccess();
			},
			data: null,
			error: null,
			isPending: false,
			isSuccess: true,
		});

		const { result } = renderHook(useForgotPassword);

		act(() => {
			result.current.handleForgotPassword({
				formFields: fields,
				openModal,
			});
		});

		expect(openModal).toHaveBeenCalled();
	});

	it('should call openModal on error', async () => {
		mockUseForgotPasswordMutation.mockReturnValue({
			mutate: (_data: any, { onError }: any) => {
				onError();
			},
			data: null,
			error: 'error',
			isPending: false,
			isSuccess: true,
		});

		const { result } = renderHook(useForgotPassword);

		act(() => {
			result.current.handleForgotPassword({
				formFields: fields,
				openModal,
			});
		});

		expect(openModal).toHaveBeenCalled();
	});
});
