import { AuthLayout, RootLayout } from '@/layouts';
import {
	ForgotPassword,
	Home,
	Login,
	ResetPassword,
	TokenExpired,
} from '@/pages';
import { useRoutes } from 'react-router-dom';

const Routes = () => {
	const element = useRoutes([
		{
			path: 'authentication',
			element: <AuthLayout />,
			children: [
				{
					path: 'login',
					element: <Login />,
				},
				{
					path: 'forgot-password',
					element: <ForgotPassword />,
				},
				{
					path: 'reset-password',
					element: <ResetPassword />,
				},
				{
					path: 'token-expired',
					element: <TokenExpired />,
				},
			],
		},
		{
			path: '',
			element: <RootLayout />,
			children: [
				{
					path: '/',
					element: <Home />,
				},
			],
		},
	]);
	return element;
};

export default Routes;
