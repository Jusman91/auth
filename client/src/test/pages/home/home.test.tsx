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
			screen.getByRole('img', { name: /menu/i }),
			screen.getByRole('heading', { name: /welcome/i }),
			screen.getByRole('heading', {
				name: 'This website was created for learning,',
			}),
			screen.getByRole('heading', {
				name: 'so if you log out your account will be',
			}),
			screen.getByRole('heading', { name: 'Deleted' }),
			screen.getByRole('button', { name: /menu/i }),
			screen.getByRole('button', { name: /home/i }),
			screen.getByRole('button', { name: /about/i }),
			screen.getByRole('button', { name: /contact/i }),
			screen.getByRole('button', { name: /github/i }),
			screen.getByRole('button', { name: /linkedin/i }),
			screen.getByRole('button', { name: /logout/i }),
		];
		elements.forEach((el) => {
			expect(el).toBeInTheDocument();
		});
	});
});
