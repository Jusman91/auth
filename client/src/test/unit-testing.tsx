/* eslint-disable react-refresh/only-export-components */
import ScrollToTop from '@/components/scroll-to-top';
import { ThemeContextProvider } from '@/contexts';
import { QueryProviders } from '@/lib/react-query';
import { ReactElement, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

const AllTheProviders = ({
	children,
}: {
	children: ReactNode;
}) => {
	return (
		<BrowserRouter>
			<ScrollToTop>
				<ThemeContextProvider>
					<QueryProviders>{children}</QueryProviders>
				</ThemeContextProvider>
			</ScrollToTop>
		</BrowserRouter>
	);
};

function customRender(ui: ReactElement, options = {}) {
	return render(ui, {
		wrapper: AllTheProviders,
		...options,
	});
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

export { customRender as render };
