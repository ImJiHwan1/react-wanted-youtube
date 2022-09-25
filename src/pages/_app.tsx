import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import store from '@store/index';

function MyApp({ Component, pageProps }: AppProps) {
	const client = new QueryClient();
	return (
		<QueryClientProvider client={client}>
			<Provider store={store}>
				<Component {...pageProps} />
				<ReactQueryDevtools />
			</Provider>
		</QueryClientProvider>
	);
}

export default MyApp;
