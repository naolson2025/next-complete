import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <Main />
          <NextScript />
          {/* The purpose of this is to react portal the notification to the top of the DOM for accessiblity */}
          <div id='notifications'></div>
        </body>
      </Html>
    )
  }
}

export default MyDocument