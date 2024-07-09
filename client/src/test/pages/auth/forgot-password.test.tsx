import { FormContextProvider } from '@/contexts';
import {
	render,
	screen,
	userEvent,
	waitFor,
} from '@/test/unit-testing';
import { ForgotPassword } from '@/pages';
import * as hooks from '@/hooks';

const RenderForgotPassword = () => {
	return render(
		<FormContextProvider name='forgot-password'>
			<ForgotPassword />
		</FormContextProvider>,
	);
};

describe('Forgot Password', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const fields = {
		email: 'testuser@example.com',
	};

	it('should render component correctly', () => {
		RenderForgotPassword();
		const elements = [
			screen.getAllByRole('heading', {
				name: /forgot password/i,
			})[0],
			screen.getByRole('heading', {
				name: 'We will send you an email to reset your password!',
			}),
			screen.getByRole('heading', { name: '↵Back to' }),
			screen.getByRole('textbox', { name: /email/i }),
			screen.getByRole('link', { name: /login/i }),
			screen.getByRole('button', { name: /send/i }),
		];

		elements.forEach((el) => {
			expect(el).toBeInTheDocument();
		});
	});

	it('should call handleForgotPassword', async () => {
		userEvent.setup();
		const mockHandleForgotPassword = vi.fn();
		const spy = vi
			.spyOn(hooks, 'useForgotPassword')
			.mockReturnValue({
				handleForgotPassword: mockHandleForgotPassword,
				data: undefined,
				error: null,
				loading: false,
				isSuccess: false,
			});

		RenderForgotPassword();

		const emailEl = screen.getByRole('textbox', {
			name: /email/i,
		});

		const buttonEl = screen.getByRole('button', {
			name: /send/i,
		});

		await userEvent.type(emailEl, fields.email);
		await userEvent.click(buttonEl);

		await waitFor(() => {
			expect(spy).toHaveBeenCalled();
			expect(mockHandleForgotPassword).toHaveBeenCalledWith(
				{
					formFields: fields,
					openModal: expect.any(Function),
				},
			);
		});
	});

	it('should show success modal if send successful', async () => {
		vi.spyOn(hooks, 'useForgotPassword').mockReturnValue({
			handleForgotPassword: vi.fn(),
			data: {
				message: 'Check your email',
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

		RenderForgotPassword();

		const modalEl = screen.getByRole('heading', {
			name: /check your email/i,
		});

		expect(modalEl).toBeInTheDocument();
	});

	it('should show error modal if send failed', async () => {
		vi.spyOn(hooks, 'useForgotPassword').mockReturnValue({
			handleForgotPassword: vi.fn(),
			data: undefined,
			error: {
				message: 'User not existing',
				name: 'forgotPasswordFailed',
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

		RenderForgotPassword();

		const modalEl = screen.getByRole('heading', {
			name: /user not existing/i,
		});
		expect(modalEl).toBeInTheDocument();
	});
});
