import { useRouter } from 'next/router';

const FilteredEventsPage = () => {
  const router = useRouter();

  const filteredData = router.query.slug;

  return (
    <div>
      <h1>The Filtered Events Page</h1>
    </div>
  );
}

export default FilteredEventsPage;