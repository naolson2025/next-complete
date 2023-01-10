import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { useRouter } from 'next/router';

const AllEventsPage = (props) => {
  const router = useRouter();
  const events = props.events;

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  )
};

export async function getStaticProps() {
  return {
    props: {
      events: await getAllEvents()
    },
    revalidate: 60
  }
}

export default AllEventsPage;