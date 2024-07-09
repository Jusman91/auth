import { FormContextProvider } from '@/contexts';
import {
	render,
	screen,
	userEvent,
	waitFor,
} from '../../unit-testing';
import { Register } from '@/pages';
import * as hooks from '@/hooks';

const RenderRegister = () => {
	return render(
		<FormContextProvider name='register'>
			<Register />
		</FormContextProvider>,
	);
};
describe('Register', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const fields = {
		username: 'testuser',
		email: 'testuser@example.com',
		password: 'password123',
		confirmPassword: 'password123',
	};

	it('should render Register correctly', () => {
		RenderRegister();
		const elements = [
			screen.getAllByRole('heading', {
				name: /register/i,
			})[0],
			screen.getByRole('heading', {
				name: 'Please create your account here!',
			}),
			screen.getByRole('heading', {
				name: 'Already have an account?',
			}),
			screen.getByRole('textbox', {
				name: /username/i,
			}),
			screen.getByRole('textbox', {
				name: /email/i,
			}),
			screen.getByText('Password'),
			screen.getByText('Confirm Password'),
			screen.getByRole('link', { name: /login/i }),
			screen.getByRole('button', { name: /register/i }),
		];

		elements.forEach((el) => {
			expect(el).toBeInTheDocument();
		});
	});

	it('should call handleRegister', async () => {
		userEvent.setup();
		const mockHandleRegister = vi.fn();
		const spy = vi
			.spyOn(hooks, 'useRegister')
			.mockReturnValue({
				handleRegister: mockHandleRegister,
				data: undefined,
				error: null,
				loading: false,
				isSuccess: false,
			});

		RenderRegister();

		const usernameEl = screen.getByRole('textbox', {
			name: /username/i,
		});
		const emailEl = screen.getByRole('textbox', {
			name: /email/i,
		});
		const passwordEl = screen.getByLabelText('Password');
		const cfPasswordEl = screen.getByLabelText(
			'Confirm Password',
		);
		const buttonEl = screen.getByRole('button', {
			name: /register/i,
		});

		await userEvent.type(usernameEl, fields.username);
		await userEvent.type(emailEl, fields.email);
		await userEvent.type(passwordEl, fields.password);
		await userEvent.type(
			cfPasswordEl,
			fields.confirmPassword,
		);
		await userEvent.click(buttonEl);

		await waitFor(() => {
			expect(spy).toHaveBeenCalled();
			expect(mockHandleRegister).toHaveBeenCalledWith({
				formFields: fields,
				openModal: expect.any(Function),
			});
		});
	}, 10000);

	it('should show success modal on successful register', async () => {
		vi.spyOn(hooks, 'useRegister').mockReturnValue({
			handleRegister: vi.fn(),
			data: {
				message: 'Register successful',
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

		RenderRegister();

		const modalEl = screen.getByRole('heading', {
			name: /register successful/i,
		});
		expect(modalEl).toBeInTheDocument();
	});

	it('should show error modal if register error', async () => {
		vi.spyOn(hooks, 'useRegister').mockReturnValue({
			handleRegister: vi.fn(),
			data: undefined,
			error: {
				message: 'Register failed',
				name: 'registerFailed',
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

		RenderRegister();

		const modalEl = screen.getByRole('heading', {
			name: /register failed/i,
		});
		expect(modalEl).toBeInTheDocument();
	});
});
