import Head from 'next/head';
import PropTypes from 'prop-types';
// Compiled from styles/style.styl by scripts/build-css.mjs, which the
// `predev` and `prebuild` npm scripts run for you. Global CSS has to be
// imported from _app.js — that is a Next.js rule, not an arbitrary one.
import '../styles/generated/style.css';

export default function SyntaxApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Lives here rather than in _document.js, which Next explicitly
            disallows for the viewport tag. */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

SyntaxApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};
