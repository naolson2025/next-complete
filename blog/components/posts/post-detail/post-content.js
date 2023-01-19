import ReactMarkdown from 'react-markdown';

import PostHeader from './post-header';
import classes from './post-content.module.css';

// our post content is read from a markdown file
// stored in our root level posts directory.
// we are not using a database to store our posts
// the benefit of markdown is that it is easy to write
// and its automatically converted to HTML
function PostContent(props) {
  const { post } = props;

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      {/* 
        The content is markdown and the ReactMarkdown converts
        it to JSX
      */}
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;