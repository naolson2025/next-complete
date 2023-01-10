// _document.js allows us to customize the entire HTML document

import Document, { Html, Head, Main, NextScript } from 'next/document';

// this is the default structure of the _document file
// we need to keep this structure
// we can set the lang attribute to the html tag
// here we can also add <div id='overlays' /> which we can use with react portal
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name="description" content="find events here!" />
        </Head>
        <body>
          <div id='overlays' />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}