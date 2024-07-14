import * as hooks from '@/hooks';
import * as storage from '@/lib/utils/storage';
import * as renderRoutes from '@testing-library/react';
import * as themeToken from '@/theme';
import { RootLayout } from '@/layouts';
import { render, screen } from '../unit-testing';
import { IThemeContext, IUser } from '@/types';
import {
	MemoryRouter,
	Route,
	Routes,
} from 'react-router-dom';

describe('Layouts- RootLayout', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const RenderRootLayout = () => {
		return render(<RootLayout />);
	};

	const RenderRoutes = () => {
		return renderRoutes.render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path='/*' element={<RootLayout />}>
						<Route index element={<div>Home</div>} />
					</Route>
					<Route
						path='/auth/login'
						element={<div>Login</div>}
					/>
				</Routes>
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

		RenderRootLayout();

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

	it('should navigate to login if not authenticated', () => {
		vi.spyOn(
			storage,
			'getAuthenticatedInStorage',
		).mockReturnValue(false);
		vi.spyOn(storage, 'getUserInStorage').mockReturnValue(
			null as unknown as IUser,
		);

		RenderRoutes();

		expect(screen.queryByText('Home')).toBeNull();
		expect(screen.queryByText('Login')).toBeInTheDocument();
	});

	it('should render layout if authenticated', () => {
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

	it('should render child components', () => {
		vi.spyOn(
			storage,
			'getAuthenticatedInStorage',
		).mockReturnValue(true);
		vi.spyOn(storage, 'getUserInStorage').mockReturnValue(
			user,
		);

		RenderRootLayout();

		const elements = [
			screen.getByRole('main'),
			screen.getByRole('contentinfo'),
		];

		elements.forEach((el) => {
			expect(el).toBeInTheDocument();
		});
	});
});
