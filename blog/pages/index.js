// this is the starting page
// the goal is to keep the HomePage component lean
// and focus on fetching data here.
// The design of the page is done in the components
import Hero from "../components/home-page/Hero";

function HomePage() {
  return (
    <>
      <Hero />
      {/* <FeaturedPosts posts={posts} /> */}
    </>
  )
}

export default HomePage;