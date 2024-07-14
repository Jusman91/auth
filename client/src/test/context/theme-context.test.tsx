import { SwitchAuthPage } from '@/components/molecules';
import { ThemeContextProvider } from '@/contexts';
import { ISwitchAuthProps } from '@/types';
import { ReactNode } from 'react';
import { render, screen, userEvent } from '../unit-testing';
import * as hooks from '@/hooks';

const renderWithThemeContext = (ui: ReactNode) => {
	return render(
		<ThemeContextProvider>{ui}</ThemeContextProvider>,
	);
};

const ToggleThemeComponent = () => {
	const { myTheme, toggleMyTheme } =
		hooks.useThemeContext();
	return (
		<div>
			<span>{myTheme}</span>
			<button onClick={toggleMyTheme}>Toggle Theme</button>
		</div>
	);
};

describe('Context - ThemeContext', () => {
	beforeEach(() => {});
	it('should display the current class if the theme is light', () => {
		const props: ISwitchAuthProps = {
			desc: '',
			path: '',
			txtLink: '',
		};

		renderWithThemeContext(<SwitchAuthPage {...props} />);
		const el = screen.getByRole('heading');
		expect(el).toHaveClass('text-primary-40');
		expect(el).not.toHaveClass('text-color-base');
	});

	it('should toggle the theme when toggleMyTheme is called', async () => {
		userEvent.setup();
		renderWithThemeContext(<ToggleThemeComponent />);
		let themeDisplay = screen.getByText('dark');
		const button = screen.getByRole('button', {
			name: /toggle theme/i,
		});

		expect(themeDisplay).toBeInTheDocument();

		await userEvent.click(button);

		themeDisplay = screen.getByText('light');
		expect(themeDisplay).toBeInTheDocument();

		await userEvent.click(button);

		themeDisplay = screen.getByText('dark');
		expect(themeDisplay).toBeInTheDocument();
	});
});
