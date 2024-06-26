import { FormContextProvider } from '@/contexts';
import { AuthLayout, RootLayout } from '@/layouts';
import {
	About,
	Contact,
	ForgotPassword,
	Home,
	Login,
	Register,
	ResetPassword,
	TokenExpired,
} from '@/pages';
import { useRoutes } from 'react-router-dom';

const Routes = () => {
	const element = useRoutes([
		{
			path: 'auth',
			element: <AuthLayout />,
			children: [
				{
					path: 'register',
					element: (
						<FormContextProvider name='register'>
							<Register />,
						</FormContextProvider>
					),
				},
				{
					path: 'login',
					element: (
						<FormContextProvider name='login'>
							<Login />,
						</FormContextProvider>
					),
				},
				{
					path: 'forgot-password',
					element: (
						<FormContextProvider name='forgot-password'>
							<ForgotPassword />,
						</FormContextProvider>
					),
				},
				{
					path: 'reset-password/:id/:token',
					element: (
						<FormContextProvider name='reset-password'>
							<ResetPassword />,
						</FormContextProvider>
					),
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
				{
					path: 'about',
					element: <About />,
				},
				{
					path: 'contact',
					element: <Contact />,
				},
			],
		},
	]);
	return element;
};

export default Routes;
