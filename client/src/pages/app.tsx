import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from '@/contexts/auth-context';
import { ThemeContextProvider } from '@/contexts/theme-context';
import QueryProviders from '@/lib/react-query/query-providers';
import Routes from '@/routes';

const App = () => {
	return (
		<BrowserRouter>
			<ThemeContextProvider>
				<QueryProviders>
					<AuthContextProvider>
						<Routes />
					</AuthContextProvider>
				</QueryProviders>
			</ThemeContextProvider>
		</BrowserRouter>
	);
};

export default App;
