import { TokenExpired } from '@/pages';
import { render, screen } from '../../unit-testing';

describe('Pages - TokenExpired', () => {
	it('should render component correctly', () => {
		render(<TokenExpired />);
		const elements = [
			screen.getByRole('heading', {
				name: 'Invalid or Expired Token!',
			}),
			screen.getByRole('heading', { name: '↵Back to' }),
			screen.getByRole('link', { name: /login/i }),
		];

		elements.forEach((el) => {
			expect(el).toBeInTheDocument();
		});
	});
});
