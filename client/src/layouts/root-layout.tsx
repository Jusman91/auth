import { FormContextProvider } from '@/contexts/form-context';
import { useAuthContext } from '@/hooks/use-context';
import { useTheme } from '@/hooks/use-theme';
import { ConfigProvider, Layout } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';

const RootLayout = () => {
	const { rootTheme } = useTheme();
	const { isAuthenticated, user } = useAuthContext();

	if (!isAuthenticated && !user)
		return <Navigate to={'/authentication/login'} />;

	return (
		<ConfigProvider theme={rootTheme}>
			<FormContextProvider>
				<main>
					<Layout>
						<Outlet />
					</Layout>
				</main>
			</FormContextProvider>
		</ConfigProvider>
	);
};

export default RootLayout;
