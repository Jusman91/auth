import { Navigate, Outlet } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import { useThemeContext } from '@/hooks';
import {
	getAuthenticatedInStorage,
	getUserInStorage,
} from '@/lib/utils/storage';
import { themeToken } from '@/theme';
import { Footer } from '@/components/organisms';

const RootLayout = () => {
	const { myTheme } = useThemeContext();
	const { rootTheme } = themeToken(myTheme);
	const user = getUserInStorage();
	const isAuthenticated = getAuthenticatedInStorage();
	if (!isAuthenticated && !user)
		return <Navigate to={'/auth/login'} />;

	return (
		<ConfigProvider theme={rootTheme}>
			<main role='main'>
				<Layout className='relative w-full min-h-screen overflow-x-hidden bg-bkg-base'>
					<Outlet />
					<Footer />
				</Layout>
			</main>
		</ConfigProvider>
	);
};

export default RootLayout;
