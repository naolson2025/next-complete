import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';

const HomePage = (props) => {
  return (
    <div>
      <EventList items={props.featuredEvents} />
    </div>
  )
};

// here we fetch the data on the server side
export async function getStaticProps() {
  return {
    props: {
      featuredEvents: await getFeaturedEvents()
    },
    // rebuilds the page every 30 minutes
    revalidate: 1800
  }
}

export default HomePage;