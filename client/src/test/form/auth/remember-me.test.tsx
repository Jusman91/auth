import { RememberMe } from '@/components/molecules';
import { FormContextProvider } from '@/contexts';
import {
	render,
	screen,
	userEvent,
} from '@/test/unit-testing';

describe('RememberMe', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const RenderRememberMe = () => {
		return render(
			<FormContextProvider name='login'>
				<RememberMe />
			</FormContextProvider>,
		);
	};

	it('should render component correctly', () => {
		RenderRememberMe();
		const elements = [
			screen.getByRole('checkbox', { name: 'Remember Me' }),
			screen.getByRole('link', {
				name: 'Forgot Password?',
			}),
		];

		elements.forEach((el) => {
			expect(el).toBeInTheDocument();
		});
	});

	it('should navigate to correct path on link click', async () => {
		userEvent.setup();
		RenderRememberMe();
		const linkEl = screen.getByRole('link', {
			name: 'Forgot Password?',
		});

		await userEvent.click(linkEl);
		expect(window.location.pathname).toBe(
			'/auth/forgot-password',
		);
	});
});
