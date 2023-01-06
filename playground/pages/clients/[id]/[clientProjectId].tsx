// this is an example of nested wildcard routes
import { useRouter } from "next/router";

const ClientProjectPageId = () => {
  const router = useRouter();

  // http://localhost:3000/clients/max/projecta
  // router.pathname = /clients/[id]/[clientProjectId]
  console.log(router.pathname);
  // router.query = { id: 'max', clientProjectId: 'projecta' }
  console.log(router.query);

  return (
    <div>
      <h1>The Client Project Page by Id</h1>
    </div>
  );
};

export default ClientProjectPageId;