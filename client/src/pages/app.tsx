import { BrowserRouter } from 'react-router-dom';
import { ThemeContextProvider } from '@/contexts';
import Routes from '@/routes';
import { QueryProviders } from '@/lib/react-query';
import ScrollToTop from '@/components/scroll-to-top';

const App = () => {
	return (
		<BrowserRouter>
			<ScrollToTop>
				<ThemeContextProvider>
					<QueryProviders>
						<Routes />
					</QueryProviders>
				</ThemeContextProvider>
			</ScrollToTop>
		</BrowserRouter>
	);
};

export default App;
