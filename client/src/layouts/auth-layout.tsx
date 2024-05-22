import Footer from '@/components/footer/footer';
import { FormContextProvider } from '@/contexts/form-context';
import { useAuthContext } from '@/hooks/use-context';
import { useTheme } from '@/hooks/use-theme';
import { ConfigProvider } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
	const { rootTheme } = useTheme();
	const { isAuthenticated, user } = useAuthContext();

	if (isAuthenticated && user) return <Navigate to={'/'} />;

	return (
		<ConfigProvider theme={rootTheme}>
			<FormContextProvider>
				<section className='bg-[#F8FAFC]'>
					<div className='w-full grid place-items-center min-h-screen p-4 md:p-16'>
						<Outlet />
					</div>
					<Footer />
				</section>
			</FormContextProvider>
		</ConfigProvider>
	);
};

export default AuthLayout;
