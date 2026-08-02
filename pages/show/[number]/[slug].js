import slug from 'speakingurl';
import ShowPage from '../../../components/ShowPage';
import { getShows, getShow, getShowsList } from '../../../lib/getShows';

export async function getStaticPaths() {
  const shows = await getShows('all');

  return {
    // Every path is listed below, so anything else is a genuine 404. `false`
    // is the only value a static export can honour — the other modes need a
    // server to render the missing page on demand.
    fallback: false,
    paths: [
      // Kept so the pre-existing /show/latest/latest URL still resolves;
      // the canonical homepage is now pages/index.js.
      {
        params: {
          number: 'latest',
          slug: 'latest',
        },
      },
      ...shows.map((show) => ({
        params: {
          number: show.displayNumber,
          slug: slug(show.title),
        },
      })),
    ],
  };
}

export async function getStaticProps({ params }) {
  const shows = await getShowsList();
  const showNumber =
    params.number === 'latest' ? shows[0].displayNumber : params.number;
  const show = await getShow(showNumber);
  const props = show.date > Date.now() ? {} : { shows, showNumber, show };

  return { props };
}

export default ShowPage;
