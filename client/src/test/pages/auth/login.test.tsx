import { FormContextProvider } from '@/contexts';
import {
	render,
	screen,
	userEvent,
	waitFor,
} from '@/test/unit-testing';
import { Login } from '@/pages';
import * as hooks from '@/hooks';

const RenderLogin = () => {
	return render(
		<FormContextProvider name='login'>
			<Login />
		</FormContextProvider>,
	);
};

describe('Login', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const fields = {
		email: 'testuser@example.com',
		password: 'password123',
		rememberMe: true,
	};

	it('should render component correctly', () => {
		RenderLogin();

		const elements = [
			screen.getByRole('heading', { name: /login/i }),
			screen.getByRole('heading', {
				name: 'Please enter your account here!',
			}),
			screen.getByRole('heading', {
				name: "Don't have an account?",
			}),
			screen.getByRole('textbox', {
				name: /email/i,
			}),
			screen.getByText('Password'),
			screen.getByRole('checkbox', {
				name: /remember me/i,
			}),
			screen.getByRole('link', {
				name: /forgot password/i,
			}),
			screen.getByRole('link', { name: /register/i }),
			screen.getByRole('button', { name: /login/i }),
		];

		elements.forEach((el) => {
			expect(el).toBeInTheDocument();
		});
	});

	it('should call handleLogin', async () => {
		userEvent.setup();
		const mockHandleLogin = vi.fn();
		const spy = vi
			.spyOn(hooks, 'useLogin')
			.mockReturnValue({
				handleLogin: mockHandleLogin,
				data: undefined,
				error: null,
				loading: false,
				isSuccess: false,
			});

		RenderLogin();

		const emailEl = screen.getByRole('textbox', {
			name: /email/i,
		});
		const passwordEl = screen.getByLabelText('Password');
		const rememberMeEl = screen.getByRole('checkbox', {
			name: /remember me/i,
		});

		const buttonEl = screen.getByRole('button', {
			name: /login/i,
		});

		await userEvent.type(emailEl, fields.email);
		await userEvent.type(passwordEl, fields.password);
		await userEvent.click(rememberMeEl);
		await userEvent.click(buttonEl);

		await waitFor(() => {
			expect(spy).toHaveBeenCalled();
			expect(mockHandleLogin).toHaveBeenCalledWith({
				formFields: fields,
				openModal: expect.any(Function),
			});
		});
	});

	it('should show success modal on successful login', async () => {
		const mockHandleLogin = vi.fn();
		vi.spyOn(hooks, 'useLogin').mockReturnValue({
			handleLogin: mockHandleLogin,
			data: {
				message: 'Login successful',
				accessToken: 'token',
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

		RenderLogin();

		expect(
			screen.getByText('Login successful'),
		).toBeInTheDocument();
	});

	it('should show error modal if login error', async () => {
		const mockHandleLogin = vi.fn();
		vi.spyOn(hooks, 'useLogin').mockReturnValue({
			handleLogin: mockHandleLogin,
			data: undefined,
			error: {
				message: 'Login failed',
				name: 'loginFailed',
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

		RenderLogin();

		expect(
			screen.getByText('Login failed'),
		).toBeInTheDocument();
	});
});
