import { useRouter } from 'next/router'

const CatchAll = () => {
  const router = useRouter()

  // if we navigate to http://localhost:3000/blog/hello/again
  // the router object will have a pathname of /blog/[...catchAll]
  console.log(router.pathname)
  // the query object will have a catchAll property
  // the catchAll property will be an array of strings
  // { catchAll: ['hello', 'again']}
  console.log(router.query)

  return (
    <div>
      <h1>Catch All</h1>
    </div>
  )
}

export default CatchAll