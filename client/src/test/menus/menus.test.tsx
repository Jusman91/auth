import { Menus } from '@/components/organisms';
import { render, screen, userEvent } from '../unit-testing';
import * as handlers from '@/lib/utils/handlers';
import * as hooks from '@/hooks';

describe('Component - Menus', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const RenderMenus = () => {
		return render(<Menus />);
	};
	it('should render component correctly', () => {
		RenderMenus();
		const elements = [
			screen.getByRole('button', { name: /menu/i }),
			screen.getByRole('button', { name: /logout/i }),
			screen.getByRole('button', { name: /home/i }),
			screen.getByRole('button', { name: /about/i }),
			screen.getByRole('button', { name: /contact/i }),
			screen.getByRole('button', { name: /github/i }),
			screen.getByRole('button', { name: /linkedin/i }),
			screen.getByRole('button', { name: /logout/i }),
			screen.getByRole('img', { name: /menu/i }),
		];
		elements.forEach((el) => {
			expect(el).toBeInTheDocument();
		});
	});

	it('should toggle menu open state', async () => {
		userEvent.setup();
		RenderMenus();
		const menuBtnEl = screen.getByRole('button', {
			name: /menu/i,
		});
		const menuListEl = screen.getByRole('list', {
			name: /menu-list/i,
		});

		// Initial state, menu should be closed
		expect(menuListEl).toHaveClass('w-0 opacity-0 hidden');

		await userEvent.click(menuBtnEl);

		// Click to open menu
		expect(menuListEl).toHaveClass('w-full opacity-100');

		// Click to close menu
		await userEvent.click(menuBtnEl);
		expect(menuListEl).toHaveClass('w-0 opacity-0 hidden');
	});

	it('should handle menu item clicks correctly', async () => {
		userEvent.setup();
		RenderMenus();
		const handleMenuSpy = vi.spyOn(handlers, 'handleMenus');
		const menuItemEl = screen.getByRole('button', {
			name: /home/i,
		});

		await userEvent.click(menuItemEl);

		expect(handleMenuSpy).toHaveBeenCalledWith({
			label: 'home',
			path: '/',
			newTab: false,
			id: undefined,
			navigate: expect.any(Function),
			handleDeleteUser: expect.any(Function),
		});
	});

	it('should display loading if isDeleting true', () => {
		vi.spyOn(hooks, 'useDelete').mockReturnValue({
			handleDeleteUser: vi.fn(),
			isDeleting: true,
		});
		RenderMenus();
		const loadingEl = screen.getByText(/loading/i);

		expect(loadingEl).toBeInTheDocument();
	});
});
