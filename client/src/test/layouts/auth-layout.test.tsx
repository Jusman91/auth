import * as hooks from '@/hooks';
import * as storage from '@/lib/utils/storage';
import * as renderRoutes from '@testing-library/react';
import * as themeToken from '@/theme';
import { AuthLayout } from '@/layouts';
import { IThemeContext, IUser } from '@/types';
import { render, screen } from '../unit-testing';
import {
	MemoryRouter,
	Route,
	Routes,
} from 'react-router-dom';

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
describe('Layouts - Auth', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const RenderAuthLayuot = () => {
		return render(<AuthLayout />);
	};

	const RenderRoutes = () => {
		return renderRoutes.render(
			<MemoryRouter initialEntries={['/auth/login']}>
				<Routes>
					<Route path='auth/*' element={<AuthLayout />}>
						<Route
							path='login'
							element={<div>Login</div>}
						/>
					</Route>
					<Route path='/' element={<div>Home</div>} />
				</Routes>
			</MemoryRouter>,
		);
	};

	it('should call function', () => {
		const useThemeContextSpy = vi
			.spyOn(hooks, 'useThemeContext')
			.mockReturnValue({
				myTheme: 'dark',
			} as IThemeContext);
		const themeTokenSpy = vi
			.spyOn(themeToken, 'themeToken')
			.mockReturnValue({
				authTheme: {},
				rootTheme: {},
			});
		const authenticatedSpy = vi
			.spyOn(storage, 'getAuthenticatedInStorage')
			.mockReturnValue(true);
		const userSpy = vi
			.spyOn(storage, 'getUserInStorage')
			.mockReturnValue(user);

		RenderAuthLayuot();

		const functionSpy = [
			useThemeContextSpy,
			themeTokenSpy,
			authenticatedSpy,
			userSpy,
		];

		functionSpy.forEach((fn) => {
			expect(fn).toHaveBeenCalled();
		});
	});

	it('should navigate to home if authenticated', () => {
		vi.spyOn(
			storage,
			'getAuthenticatedInStorage',
		).mockReturnValue(true);
		vi.spyOn(storage, 'getUserInStorage').mockReturnValue(
			user,
		);

		RenderRoutes();

		expect(screen.queryByText('Login')).toBeNull();
		expect(screen.queryByText('Home')).toBeInTheDocument();
	});

	it('should render AuthLayout if not authenticated', () => {
		vi.spyOn(
			storage,
			'getAuthenticatedInStorage',
		).mockReturnValue(false);
		vi.spyOn(storage, 'getUserInStorage').mockReturnValue(
			null as unknown as IUser,
		);

		RenderRoutes();

		expect(screen.getByText('Login')).toBeInTheDocument();
		expect(screen.queryByText('Home')).toBeNull();
	});

	it('should render child components', () => {
		vi.spyOn(
			storage,
			'getAuthenticatedInStorage',
		).mockReturnValue(false);
		vi.spyOn(storage, 'getUserInStorage').mockReturnValue(
			null as unknown as IUser,
		);

		RenderAuthLayuot();

		const elements = [
			screen.getAllByRole('img', { name: /star/i })[0],
			screen.getByRole('heading', {
				name: 'Copyright ©2024 MeDiscover, All rights Reserved',
			}),
		];

		elements.forEach((el) => {
			expect(el).toBeInTheDocument();
		});
	});
});
