import { Home } from '@/pages';
import { render, screen } from '@/test/unit-testing';

describe('Pages- Home', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const RenderHome = () => {
		return render(<Home />);
	};

	it('should render component correctly', () => {
		RenderHome();
		const elements = [
			screen.getAllByRole('img', { name: /star/i })[0],
			screen.getByRole('img', { name: /logout/i }),
			screen.getByRole('heading', { name: /welcome/i }),
			screen.getByRole('heading', {
				name: 'This website was created for learning,',
			}),
			screen.getByRole('heading', {
				name: 'so if you log out your account will be',
			}),
			screen.getByRole('heading', { name: 'Deleted' }),
			screen.getByRole('button', { name: 'Logout' }),
			screen.getByLabelText('home'),
			screen.getByLabelText('about'),
			screen.getByLabelText('contact'),
			screen.getByLabelText('github'),
			screen.getByLabelText('linkedin'),
			screen.getByLabelText('logout'),
		];
		elements.forEach((el) => {
			expect(el).toBeInTheDocument();
		});
	});
});
