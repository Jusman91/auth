import {
	mockGetFieldsAuthFormData,
	mockGetHeaderAuthFormData,
	mockGetInitialValues,
	mockGetSwitchAuthFormData,
	mockGetTxtBtnSubmitAuthForm,
	mockHandleRegister,
	mockUseFormContext,
	mockUseModal,
	mockUseRegister,
	mockUseScrollToTop,
	mockUseThemeContext,
} from '@/test/mocks';
import {
	render,
	screen,
	userEvent,
	waitFor,
} from '@/test/unit-testing';
import Register from './register';
import { FormContextProvider } from '@/contexts';

vi.mock('@/hooks', () => ({
	useThemeContext: mockUseThemeContext,
	useFormContext: mockUseFormContext,
	useModal: mockUseModal,
	useScrollToTop: mockUseScrollToTop,
	useRegister: mockUseRegister,
}));
vi.mock('@/lib/utils/auth', () => ({
	getInitialValues: mockGetInitialValues,
	getHeaderAuthFormData: mockGetHeaderAuthFormData,
	getSwitchAuthFormData: mockGetSwitchAuthFormData,
	getFieldsAuthFormData: mockGetFieldsAuthFormData,
	getTxtBtnSubmitAuthForm: mockGetTxtBtnSubmitAuthForm,
}));

describe('Register', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});
	it('should render Register with the correctly', () => {
		render(
			<FormContextProvider name='register'>
				<Register />
			</FormContextProvider>,
		);

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

	it('should call fucntion with correct arguments', () => {
		render(
			<FormContextProvider name='register'>
				<Register />
			</FormContextProvider>,
		);

		const mockFunctions = [
			mockGetHeaderAuthFormData,
			mockGetInitialValues,
			mockGetFieldsAuthFormData,
			mockGetSwitchAuthFormData,
		];

		mockFunctions.forEach((mockFn) => {
			expect(mockFn).toHaveBeenCalledWith('register');
		});
	});

	it('should call handleRegister', async () => {
		userEvent.setup();
		const field = {
			username: 'testuser',
			email: 'testuser@example.com',
			password: 'password123',
			confirmPassword: 'password123',
		};

		render(
			<FormContextProvider name='register'>
				<Register />
			</FormContextProvider>,
		);

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
		await userEvent.type(usernameEl, field.username);
		await userEvent.type(emailEl, field.email);
		await userEvent.type(passwordEl, field.password);
		await userEvent.type(
			cfPasswordEl,
			field.confirmPassword,
		);

		console.log('Before clicking register button');
		await userEvent.click(buttonEl);
		console.log('After clicking register button');

		console.log(
			'mockUseRegister called',
			mockUseRegister.mock.calls.length,
		);
		expect(mockUseRegister).toHaveBeenCalledTimes(1);
		console.log(
			'mockHandleRegister calls:',
			mockHandleRegister.mock.calls,
		);
		expect(mockHandleRegister).toHaveBeenCalledWith(
			{
				formFields: field,
				openModal: expect.any(Function),
			},
			20000,
		);
	});
});
