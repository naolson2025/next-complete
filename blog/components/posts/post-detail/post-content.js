import ReactMarkdown from 'react-markdown';

import PostHeader from './post-header';
import classes from './post-content.module.css';
import Image from 'next/image';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// our post content is read from a markdown file
// stored in our root level posts directory.
// we are not using a database to store our posts
// the benefit of markdown is that it is easy to write
// and its automatically converted to HTML
function PostContent(props) {
  const { post } = props;

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  // these custom renderers override the default rendering
  // of the ReactMarkdown component
  // here we override the regular <img> tag to use the next image component
  // we also override the <p> if it has a nested <img> because markdown automatically wraps images
  // in a <p> tag, which causes errors in the dev console.
  const customRenderers = {
    // don't need the image override anymore cuz the <p> override handles it

    // image(image) {
    //   return (
    //     <Image
    //       src={`/images/posts/${post.slug}/${image.src}`}
    //       alt={image.alt}
    //       width={600}
    //       height={300}
    //     />
    //   )
    // },
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
    code(code) {
      const { className, children } = code;
      const language = className.split('-')[1]; // className is something like language-js => We need the "js" part here
      return (
        <SyntaxHighlighter
          style={atomDark}
          language={language}
          children={children}
        />
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      {/* 
        The content is markdown and the ReactMarkdown converts
        it to JSX

        the components prop is used to customize the rendering
        here we custom render the image inside the markdown
        to use the next image component
      */}
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
