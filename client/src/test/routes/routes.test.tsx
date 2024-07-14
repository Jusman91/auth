import * as renderRoutes from '@testing-library/react';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '@/routes';
import { QueryProviders } from '@/lib/react-query';
import * as storage from '@/lib/utils/storage';
import { IUser } from '@/types';

describe('Routes', () => {
	const RenderAppRoutes = ({
		initialRoute = '/auth/register',
	}: {
		initialRoute?: string;
	}) => {
		return renderRoutes.render(
			<MemoryRouter initialEntries={[initialRoute]}>
				<QueryProviders>
					<AppRoutes />
				</QueryProviders>
			</MemoryRouter>,
		);
	};

	const user: IUser = {
		id: 'userId',
		username: 'userName',
		email: 'example@example.com',
		profilePic: '',
		role: 'user',
		createdAt: '2024-07-11T00:00:00.000Z',
		updatedAt: '2024-07-11T00:00:00.000Z',
		__v: 0,
	};
	describe('authLayout', () => {
		it('should render register component for root route', () => {
			RenderAppRoutes({ initialRoute: '/auth/register' });
			expect(
				screen.getByRole('heading', { name: /register/i }),
			).toBeInTheDocument();
		});
		it('should render login component for root route', () => {
			RenderAppRoutes({ initialRoute: '/auth/login' });
			expect(
				screen.getByRole('heading', { name: /login/i }),
			).toBeInTheDocument();
		});
		it('should render forgot-password component for root route', () => {
			RenderAppRoutes({
				initialRoute: '/auth/forgot-password',
			});
			expect(
				screen.getByRole('heading', {
					name: /forgot password/i,
				}),
			).toBeInTheDocument();
		});
		it('should render token-expired component for root route', () => {
			RenderAppRoutes({
				initialRoute: '/auth/reset-password/:id/:token',
			});
			expect(
				screen.getByRole('heading', {
					name: 'Invalid or Expired Token!',
				}),
			).toBeInTheDocument();
		});
	});

	describe('rootLayout', () => {
		beforeEach(() => {
			vi.spyOn(
				storage,
				'getAuthenticatedInStorage',
			).mockReturnValue(true);
			vi.spyOn(storage, 'getUserInStorage').mockReturnValue(
				user,
			);
		});
		it('should render Home component for root route', () => {
			RenderAppRoutes({ initialRoute: '/' });
			expect(
				screen.getByRole('heading', { name: /welcome/i }),
			).toBeInTheDocument();
		});
		it('should render About component for /about route', () => {
			RenderAppRoutes({ initialRoute: '/about' });
			expect(
				screen.getByRole('heading', { name: /about/i }),
			).toBeInTheDocument();
		});
		it('should render Contact component for /about route', () => {
			RenderAppRoutes({ initialRoute: '/contact' });
			expect(
				screen.getByRole('heading', { name: /contact/i }),
			).toBeInTheDocument();
		});
	});
});
