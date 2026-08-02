import ShowPage from '../components/ShowPage';
import { getShow, getShowsList } from '../lib/getShows';

/**
 * The homepage shows the most recent published episode.
 *
 * Next 12 did this with a rewrite from / to /show/latest/latest. Rewrites are
 * evaluated by a server at request time, and `output: 'export'` has no server,
 * so the homepage is generated at build time here instead.
 */
export async function getStaticProps() {
  const shows = await getShowsList();
  const showNumber = shows[0].displayNumber;
  const show = await getShow(showNumber);

  return {
    props: { shows, showNumber, show },
  };
}

export default ShowPage;
