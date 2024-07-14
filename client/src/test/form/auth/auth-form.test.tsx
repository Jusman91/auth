import { FormContextProvider } from '@/contexts';
import { AuthForm } from '@/components/organisms';
import { render, screen } from '@/test/unit-testing';
import {
	getHeaderAuthFormData,
	getInitialValues,
	getSwitchAuthFormData,
} from '@/lib/utils/auth';
import { FormName } from '@/types';

vi.mock('@/lib/utils/auth', async () => {
	const mod = await vi.importActual<
		typeof import('@/lib/utils/auth')
	>('@/lib/utils/auth');
	return {
		...mod,
		getInitialValues: vi.fn((name: FormName) => {
			return mod.getInitialValues(name);
		}),
		getHeaderAuthFormData: vi.fn((name: FormName) => {
			return mod.getHeaderAuthFormData(name);
		}),
		getSwitchAuthFormData: vi.fn((name: FormName) => {
			return mod.getSwitchAuthFormData(name);
		}),
	};
});

describe('Auth-Form', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const RenderAuthForm = () => {
		return render(
			<FormContextProvider name='login'>
				<AuthForm loading={false} />
			</FormContextProvider>,
		);
	};

	it('should render component correctly', async () => {
		RenderAuthForm();
		const elements = [
			screen.getByRole('img', { name: /logo/i }),
			screen.getByRole('heading', { name: 'MeDiscover' }),
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

	it('should call utils function with correctly arguments', () => {
		RenderAuthForm();
		const utilsFcn = [
			getInitialValues,
			getHeaderAuthFormData,
			getSwitchAuthFormData,
		];

		utilsFcn.forEach((fcn) => {
			expect(fcn).toHaveBeenCalledWith('login');
		});
	});

	it('should render disabled button', () => {
		RenderAuthForm();
		const buttonEl = screen.getByRole('button', {
			name: /login/i,
		});

		expect(buttonEl).toBeDisabled();
	});
});
