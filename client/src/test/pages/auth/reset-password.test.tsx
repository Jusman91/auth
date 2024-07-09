import { FormContextProvider } from '@/contexts';
import {
	render,
	screen,
	userEvent,
	waitFor,
} from '../../unit-testing';
import { ResetPassword } from '@/pages';
import * as hooks from '@/hooks';

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
	const mod = await vi.importActual<
		typeof import('react-router-dom')
	>('react-router-dom');
	return {
		...mod,
		useParams: vi.fn().mockReturnValue({
			id: 'valid-id',
			token: 'valid-token',
		}),
		useNavigate: () => mockedUseNavigate,
	};
});

const mockIsTokenExpired = vi.fn();
vi.mock('@/validations', async () => {
	const mod = await vi.importActual<
		typeof import('@/validations')
	>('@/validations');
	return {
		...mod,
		isTokenExpired: () => mockIsTokenExpired,
	};
});

const RenderResetPassword = () => {
	return render(
		<FormContextProvider name='reset-password'>
			<ResetPassword />
		</FormContextProvider>,
	);
};

describe('Reset Password', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const fields = {
		password: 'password123',
		confirmPassword: 'password123',
	};
	const mockId = 'valid-id';
	const mockToken = 'valid-token';

	it('should render component correctly', () => {
		RenderResetPassword();
		const elements = [
			screen.getAllByRole('heading', {
				name: /reset password/i,
			})[0],
			screen.getByRole('heading', {
				name: 'Please reset your password here!',
			}),
			screen.getByRole('heading', { name: '↵Back to' }),
			screen.getByRole('link', { name: /login/i }),
			screen.getByText('Password'),
			screen.getByText('Confirm Password'),
			screen.getByRole('button', { name: /reset/i }),
		];

		elements.forEach((el) => {
			expect(el).toBeInTheDocument();
		});
	});

	it('should call handleResetPassword', async () => {
		userEvent.setup();
		const mockHandleResetPassword = vi.fn();
		const spy = vi
			.spyOn(hooks, 'useResetPassword')
			.mockReturnValue({
				handleResetPassword: mockHandleResetPassword,
				data: undefined,
				error: null,
				loading: false,
				isSuccess: false,
			});

		mockIsTokenExpired.mockReturnValue(false);

		RenderResetPassword();

		const passwordEl = screen.getByLabelText('Password');
		const cfPasswordEl = screen.getByLabelText(
			'Confirm Password',
		);
		const buttonEl = screen.getByRole('button', {
			name: /reset/i,
		});

		await userEvent.type(passwordEl, fields.password);
		await userEvent.type(
			cfPasswordEl,
			fields.confirmPassword,
		);
		await userEvent.click(buttonEl);

		await waitFor(() => {
			expect(spy).toHaveBeenCalled();
			expect(mockHandleResetPassword).toHaveBeenCalledWith({
				formFields: fields,
				id: mockId,
				token: mockToken,
				openModal: expect.any(Function),
			});
		});
	});

	it('should navigate to /auth/token-expired if token expired', () => {
		mockIsTokenExpired.mockReturnValue(true);

		RenderResetPassword();

		expect(mockedUseNavigate).toHaveBeenCalledWith(
			'/auth/token-expired',
		);
	});

	it('should show success modal if reset successful', async () => {
		vi.spyOn(hooks, 'useResetPassword').mockReturnValue({
			handleResetPassword: vi.fn(),
			data: {
				message:
					'Reset password successfully, please login again!',
			},
			error: null,
			loading: false,
			isSuccess: true,
		});

		const mockOpenModal = vi.fn();
		vi.spyOn(hooks, 'useModal').mockReturnValue({
			isOpen: true,
			closeModal: vi.fn(),
			openModal: mockOpenModal,
		});

		RenderResetPassword();

		const modalEl = screen.getByRole('heading', {
			name: 'Reset password successfully, please login again!',
		});

		expect(modalEl).toBeInTheDocument();
	});

	it('should show error modal if reset failed', async () => {
		vi.spyOn(hooks, 'useResetPassword').mockReturnValue({
			handleResetPassword: vi.fn(),
			data: undefined,
			error: {
				message: 'Invalid id or token',
				name: 'resetPasswordFailed',
			},
			loading: false,
			isSuccess: false,
		});

		const mockOpenModal = vi.fn();
		vi.spyOn(hooks, 'useModal').mockReturnValue({
			isOpen: true,
			closeModal: vi.fn(),
			openModal: mockOpenModal,
		});

		RenderResetPassword();

		const modalEl = screen.getByRole('heading', {
			name: 'Invalid id or token',
		});
		expect(modalEl).toBeInTheDocument();
	});
});
