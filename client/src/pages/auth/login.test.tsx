import {
	mockGetFieldsAuthFormData,
	mockGetHeaderAuthFormData,
	mockGetInitialValues,
	mockGetSwitchAuthFormData,
	mockGetTxtBtnSubmitAuthForm,
	mockHandleLogin,
	mockUseFormContext,
	mockUseLogin,
	mockUseModal,
	mockUseScrollToTop,
	mockUseThemeContext,
} from '@/test/mocks';
import {
	render,
	screen,
	userEvent,
	waitFor,
} from '@/test/unit-testing';
import { FormContextProvider } from '@/contexts';
import Login from './login';
import { useLogin } from '@/hooks';
import * as hooks from '@/hooks';

vi.mock('@/hooks', () => ({
	useThemeContext: mockUseThemeContext,
	useFormContext: mockUseFormContext,
	useModal: mockUseModal,
	useScrollToTop: mockUseScrollToTop,
	useLogin: vi.fn().mockReturnValue({
		data: undefined,
		error: null,
		loading: false,
		isSuccess: false,
		handleLogin: vi.fn(),
	}),
}));
vi.mock('@/lib/utils/auth', () => ({
	getInitialValues: mockGetInitialValues,
	getHeaderAuthFormData: mockGetHeaderAuthFormData,
	getSwitchAuthFormData: mockGetSwitchAuthFormData,
	getFieldsAuthFormData: mockGetFieldsAuthFormData,
	getTxtBtnSubmitAuthForm: mockGetTxtBtnSubmitAuthForm,
}));

describe('Login', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockUseFormContext.mockReturnValue({
			name: 'login',
		});
	});

	it('should render Login with the correctly', () => {
		render(
			<FormContextProvider name='login'>
				<Login />
			</FormContextProvider>,
		);

		const elements = [
			screen.getAllByRole('heading', {
				name: /login/i,
			})[0],
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

	it('should call handleRegister', async () => {
		userEvent.setup();
		const field = {
			email: 'testuser@example.com',
			password: 'password123',
			rememberMe: true,
		};

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

		render(
			<FormContextProvider name='login'>
				<Login />
			</FormContextProvider>,
		);

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
		await userEvent.type(emailEl, field.email);
		await userEvent.type(passwordEl, field.password);
		await userEvent.click(rememberMeEl);
		await userEvent.click(buttonEl);
		expect(spy).toHaveBeenCalledTimes(1);

		expect(mockHandleLogin).toHaveBeenCalledWith({
			email: field.email,
			password: field.password,
			rememberMe: field.rememberMe,
		});
		await waitFor(() => {
			// expect(useLogin).toHaveBeenCalledTimes(1);
			// expect(useLogin().handleLogin).toHaveBeenCalledTimes(
			// 	2,
			// );
			// expect(mockHandleLogin).toHaveBeenCalled();
		});
	});
});
