// this is the starting page
// the goal is to keep the HomePage component lean
// and focus on fetching data here.
// The design of the page is done in the components
import Head from 'next/head';
import Hero from '../components/home-page/Hero';
import FeaturedPosts from '../components/home-page/featured-posts';
import { getFeaturedPosts } from '../lib/posts-util';

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Nick's Blog</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head> 
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

export async function getStaticProps() {
  const featuredPosts = getFeaturedPosts()

  return {
    props: {
      posts: featuredPosts,
    }
  };
}

export default HomePage;
