import { AuthModal } from '@/components/organisms';
import { FormContextProvider } from '@/contexts';
import { render, screen } from '@/test/unit-testing';
import { FormName, IAuthModalProps } from '@/types';
import * as utils from '@/lib/utils';

describe('Auth-Modal', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const RenderAuthModal = (props: IAuthModalProps) => {
		return render(
			<FormContextProvider name='forgot-password'>
				<AuthModal {...props} />
			</FormContextProvider>,
		);
	};

	const props = {
		open: true,
		title: 'forgot-password' as FormName,
		description: 'Auth modal description',
		isSuccess: true,
	};

	it('should render component correctly', () => {
		RenderAuthModal(props);
		const elements = [
			screen.getByRole('dialog'),
			screen.getByRole('button', { name: /close/i }),
			screen.getByRole('img', { name: /close/i }),
			screen.getByRole('img', { name: /ICON_SUCCESS/i }),
			screen.getByRole('heading', {
				name: /forgot password/i,
			}),
			screen.getByRole('heading', {
				name: 'Auth modal description',
			}),
		];

		elements.forEach((el) => {
			expect(el).toBeInTheDocument();
		});
	});

	it('should render title without hyphens', () => {
		const mockFormatTextWithHyphens = vi.spyOn(
			utils,
			'formatTextWithHyphen',
		);
		RenderAuthModal(props);
		const titleEl = screen.getByRole('heading', {
			name: 'forgot password',
		});
		expect(
			mockFormatTextWithHyphens,
		).toHaveBeenLastCalledWith('forgot-password');
		expect(titleEl).toBeInTheDocument();
	});

	it('should display icon ICON_FAILED if isSuccess false', () => {
		const failProps = {
			open: true,
			title: 'forgot-password' as FormName,
			description: 'Auth modal description',
			isSuccess: false,
		};
		RenderAuthModal(failProps);
		const iconEl = screen.getByRole('img', {
			name: /ICON_FAILED/i,
		});
		expect(iconEl).toBeInTheDocument();
	});
});
