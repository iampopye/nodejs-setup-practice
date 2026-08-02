import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ShowList from './ShowList';
import ShowNotes from './ShowNotes';
import Player from './Player';
import Meta from './meta';
import Page from './Page';

/**
 * The main episode view.
 *
 * Extracted out of pages/show/[number]/[slug].js so that pages/index.js can
 * render the same thing for the latest episode. Under Next 12 the homepage was
 * a `rewrites()` rule pointing / at /show/latest/latest, but rewrites need a
 * server and this site is a static export, so / is now a real page.
 */
export default function ShowPage({ showNumber, shows, show }) {
  const router = useRouter();
  const [currentShow, setCurrentShow] = useState(showNumber);
  const [currentPlaying, setCurrentPlaying] = useState(showNumber);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(
    () => {
      const { query } = router;
      if (query.number && shows) {
        setCurrentShow(
          query.number === 'latest' ? shows[0].displayNumber : query.number
        );
      }
    },
    // watch the router for changes, and when it does, the above code will change
    [router, shows]
  );

  // Episodes dated in the future are built with empty props on purpose.
  if (!shows) {
    return <ErrorPage statusCode={404} />;
  }

  const current = shows.find(
    (showItem) => showItem.displayNumber === currentPlaying
  );

  return (
    <Page>
      <Meta show={show} />
      <div className="wrapper">
        <main className="show-wrap" id="main" tabIndex="-1">
          <Player show={current} onPlayPause={(a) => setIsPlaying(!a.paused)} />
          <ShowList
            shows={shows}
            currentShow={currentShow}
            currentPlaying={currentPlaying}
            setCurrentPlaying={setCurrentPlaying}
            isPlaying={isPlaying}
          />
          <ShowNotes show={show} setCurrentPlaying={setCurrentPlaying} />
        </main>
      </div>
    </Page>
  );
}

ShowPage.propTypes = {
  shows: PropTypes.array,
  showNumber: PropTypes.string,
  show: PropTypes.object,
};
