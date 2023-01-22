import { Provider } from 'next-auth/client';

import Layout from '../components/layout/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    // if a page gets the session in getServerSideProps
    // then it will be available in pageProps
    // most pages will not have session in pageProps, but that's ok
    // The provider allows us to reduce session calls
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
