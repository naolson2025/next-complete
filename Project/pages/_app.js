import Layout from '../components/layout/layout';
import '../styles/globals.css';
import Head from 'next/head';

// this Head tag will be applied to all pages
// the initial-scale=1.0, width=device-width is for mobile responsiveness
// having a Head here and another head inside a page they will be merged
// the title here will apply to all pages, unless overwritten by a page
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>NextJS Events</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
