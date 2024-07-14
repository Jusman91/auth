/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRegister } from '@/hooks';
import { act, renderHook } from '../unit-testing';

const mockUseRegisterMutation = vi.fn();
vi.mock('@/lib/react-query', async () => {
	const mod = await vi.importActual<
		typeof import('@/lib/react-query')
	>('@/lib/react-query');
	return {
		...mod,
		useRegisterMutation: () => mockUseRegisterMutation(),
	};
});

describe('Hooks - useRegisters', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const openModal = vi.fn();
	const fields = {
		username: 'testuser',
		email: 'testuser@example.com',
		password: 'password123',
		confirmPassword: 'password123',
	};

	it('should call userRegister on handleRegister', async () => {
		const mockMutate = vi.fn();
		mockUseRegisterMutation.mockReturnValue({
			mutate: mockMutate,
			data: null,
			error: null,
			isPending: false,
			isSuccess: false,
		});
		const { result } = renderHook(useRegister);

		await act(async () => {
			result.current.handleRegister({
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
		mockUseRegisterMutation.mockReturnValue({
			mutate: (_data: any, { onSuccess }: any) => {
				onSuccess();
			},
			data: null,
			error: null,
			isPending: false,
			isSuccess: true,
		});

		const { result } = renderHook(useRegister);

		act(() => {
			result.current.handleRegister({
				formFields: fields,
				openModal,
			});
		});

		expect(openModal).toHaveBeenCalled();
	});

	it('should call openModal on error', async () => {
		mockUseRegisterMutation.mockReturnValue({
			mutate: (_data: any, { onError }: any) => {
				onError();
			},
			data: null,
			error: 'error',
			isPending: false,
			isSuccess: true,
		});

		const { result } = renderHook(useRegister);

		act(() => {
			result.current.handleRegister({
				formFields: fields,
				openModal,
			});
		});

		expect(openModal).toHaveBeenCalled();
	});
});
