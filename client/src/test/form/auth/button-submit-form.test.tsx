import { ButtonSubmitForm } from '@/components/molecules';
import { FormContextProvider } from '@/contexts';
import { render, screen } from '@/test/unit-testing';
import { IButtonSubmitFormProps } from '@/types';

describe('Button form', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const RenderButton = (props: IButtonSubmitFormProps) => {
		return render(
			<FormContextProvider name='login'>
				<ButtonSubmitForm {...props} />
			</FormContextProvider>,
		);
	};

	it('should render component correctly', () => {
		const props = {
			disabled: false,
			loading: false,
		};
		RenderButton(props);

		const buttonEl = screen.getByRole('button', {
			name: /login/i,
		});

		expect(buttonEl).toBeInTheDocument();
	});

	it('should render loading componet if props.loading is true', () => {
		const props = {
			disabled: false,
			loading: true,
		};
		RenderButton(props);
		const loadingEl = screen.queryByText('Loading');
		expect(loadingEl).toBeInTheDocument();
	});

	it('should not disable if props.disabled is true', () => {
		const props = {
			disabled: true,
			loading: false,
		};
		RenderButton(props);
		const buttonEl = screen.getByRole('button', {
			name: /login/i,
		});

		expect(buttonEl).toBeDisabled();
	});
});
