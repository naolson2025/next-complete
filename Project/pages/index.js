import Head from 'next/head';

import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';
import { getFeaturedEvents } from '../helpers/api-util';

const HomePage = (props) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="find events here!" />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.featuredEvents} />
    </div>
  );
};

// here we fetch the data on the server side
export async function getStaticProps() {
  return {
    props: {
      featuredEvents: await getFeaturedEvents(),
    },
    // rebuilds the page every 30 minutes
    revalidate: 1800,
  };
}

export default HomePage;
