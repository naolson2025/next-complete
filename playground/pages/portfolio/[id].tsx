import { useRouter } from 'next/router';

const PortfolioProjectPage = () => {
  const router = useRouter();

  // router comes with useful tools
  // it can provide us the path name and query params
  console.log(router.pathname);
  // the query object is a key value pair
  // it will have an 'id' property because the file name is [id].tsx
  // if the filename was [projectId].tsx,
  // the query object would have a 'projectId' property
  console.log(router.query);

  return (
    <div>
      <h1>Portfolio Project Page</h1>
      <p>Project ID</p>
    </div>
  );
};

export default PortfolioProjectPage;
