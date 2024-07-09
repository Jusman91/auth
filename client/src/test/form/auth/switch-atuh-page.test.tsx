import { SwitchAuthPage } from '@/components/molecules';
import { FormContextProvider } from '@/contexts';
import {
	render,
	screen,
	userEvent,
} from '@/test/unit-testing';
import { ISwitchAuthProps, IThemeContext } from '@/types';
import * as hooks from '@/hooks';

describe('Switch-auth-page', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const RenderSwitchAuthPage = (
		props: ISwitchAuthProps,
	) => {
		return render(
			<FormContextProvider name='login'>
				<SwitchAuthPage {...props} />
			</FormContextProvider>,
		);
	};

	const props = {
		desc: "Don't have an account?",
		path: '/auth/register',
		txtLink: 'Register',
	};

	it('should render component correctly', () => {
		RenderSwitchAuthPage(props);

		const elements = [
			screen.getByRole('heading', {
				name: props.desc,
			}),
			screen.getByRole('link', {
				name: props.txtLink,
			}),
		];

		elements.forEach((el) => {
			expect(el).toBeInTheDocument();
		});
	});

	it('should render link with correct path', () => {
		RenderSwitchAuthPage(props);
		const linkEl = screen.getByRole('link', {
			name: props.txtLink,
		});
		expect(linkEl.closest('a')).toHaveAttribute(
			'href',
			props.path,
		);
	});

	it('should apply correct classes based on theme', () => {
		vi.spyOn(hooks, 'useThemeContext').mockReturnValue({
			myTheme: 'dark',
		} as IThemeContext);
		RenderSwitchAuthPage(props);

		const descEl = screen.getByRole('heading', {
			name: props.desc,
		});
		const linkEl = screen.getByRole('link', {
			name: props.txtLink,
		});

		expect(descEl).toHaveClass('text-primary-40');
		expect(linkEl).toHaveClass('text-color-base');
		expect(linkEl).not.toHaveClass('text-primary-80');
	});

	it('should navigate to correct path on link click', async () => {
		userEvent.setup();
		RenderSwitchAuthPage(props);
		const linkEl = screen.getByRole('link', {
			name: props.txtLink,
		});

		await userEvent.click(linkEl);

		expect(window.location.pathname).toBe(props.path);
	});
});
