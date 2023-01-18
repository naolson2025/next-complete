import ReactMarkdown from 'react-markdown';

import PostHeader from './post-header';
import classes from './post-content.module.css';

const DUMMY_POST = {
  slug: 'getting-started-with-nextjs',
  title: 'Getting Started with NextJS',
  image: 'getting-started-nextjs.jpg',
  date: '2022-02-10',
  // the content is written in markdown and then converted to JSX
  content: '# This is a first post',
}

function PostContent() {
  const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={DUMMY_POST.title} image={imagePath} />
      {/* 
        The content is markdown and the ReactMarkdown converts
        it to JSX
      */}
      <ReactMarkdown>{DUMMY_POST.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;