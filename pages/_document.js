import Document, { Html, Head, Main, NextScript } from 'next/document';
import packageInfo from '../package.json';

// The stylesheet used to be read here as a raw string and inlined into a
// <style> tag by the old webpack loader chain. Next now owns the CSS pipeline,
// so it is imported as global CSS from _app.js instead.
class SyntaxDocument extends Document {
  render() {
    return (
      <Html lang="en" data-siiiiiiiiiiiiiiiiick="PFOXP PD125">
        <Head>
          <meta name="code" content="FQ2QP" />
          <meta name="description" content={packageInfo.description} />
          <meta name="theme-color" content="#FABF46" />
          <meta charSet="utf-8" />
          <meta property="og:description" content={packageInfo.description} />
          <meta
            property="og:image"
            content="https://syntax.fm/static/syntax-banner.png"
          />
          <link rel="icon" href="https://syntax.fm/static/favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default SyntaxDocument;
