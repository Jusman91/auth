import {
	Footer,
	TwinkleStarsBackground,
} from '@/components/organisms';
import { useThemeContext } from '@/hooks';
import {
	getAuthenticatedInStorage,
	getUserInStorage,
} from '@/lib/utils/storage';
import { themeToken } from '@/theme';
import { ConfigProvider, Layout } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
	const { myTheme } = useThemeContext();
	const { authTheme } = themeToken(myTheme);

	const user = getUserInStorage();
	const isAuthenticated = getAuthenticatedInStorage();

	if (isAuthenticated && user) return <Navigate to={'/'} />;

	return (
		<ConfigProvider theme={authTheme}>
			<Layout>
				<section className='relative bg-background-auth bg-cover bg-bottom'>
					<TwinkleStarsBackground />
					<div className='w-full grid place-items-center min-h-screen p-4 md:p-16'>
						<Outlet />
					</div>
					<Footer />
				</section>
			</Layout>
		</ConfigProvider>
	);
};

export default AuthLayout;
