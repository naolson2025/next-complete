import ReactMarkdown from 'react-markdown';

import PostHeader from './post-header';
import classes from './post-content.module.css';
import Image from 'next/image';
// the react-syntax-highlighter package is a great way to add syntax highlighting to code blocks
// but its also a large package
// so we import PrismLight which is a subset of the package
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
// only import atomDark to reduce bundle size
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
// be default the react-syntax-highlighter package will import
// all of the languages
// here we only import the javascript language, to reduce bundle size
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
// registrer only js, to reduce bundle size
SyntaxHighlighter.registerLanguage('js', js);

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
