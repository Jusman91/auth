import AuthFields from '@/components/organisms/form/auth/auth-fields';
import { FormContextProvider } from '@/contexts';
import { getFieldsAuthFormData } from '@/lib/utils/auth';
import { render, screen } from '@/test/unit-testing';
import { FormName } from '@/types';

import * as utils from '@/lib/utils';

vi.mock('@/lib/utils/auth', async () => {
	const mod = await vi.importActual<
		typeof import('@/lib/utils/auth')
	>('@/lib/utils/auth');
	return {
		...mod,
		getFieldsAuthFormData: vi.fn((name: FormName) => {
			return mod.getFieldsAuthFormData(name);
		}),
	};
});

describe('Auth-Fields', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const RenderAuthFields = () => {
		return render(
			<FormContextProvider name='forgot-password'>
				<AuthFields />
			</FormContextProvider>,
		);
	};

	it('should call utils function with correctly arguments', () => {
		RenderAuthFields();
		expect(getFieldsAuthFormData).toHaveBeenCalledWith(
			'forgot-password',
		);
	});

	it('should hide fields correctly', () => {
		vi.spyOn(utils, 'isFieldHidden').mockImplementation(
			({ fieldName }) => {
				return (
					fieldName === 'confirmPassword' ||
					fieldName === 'password' ||
					fieldName === 'username' ||
					fieldName === 'rememberMe'
				);
			},
		);
		RenderAuthFields();

		const elements = [
			screen.queryByRole('checkbox', {
				name: 'Remember Me',
			}),
			screen.queryByText('Password'),
			screen.queryByText('Confirm password'),
		];

		elements.forEach((el) => {
			expect(el).not.toBeInTheDocument();
		});
		expect(
			screen.queryByRole('textbox', { name: /email/i }),
		).toBeInTheDocument();
	});
});
