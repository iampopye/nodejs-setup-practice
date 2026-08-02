import React from 'react';
import PropTypes from 'prop-types';
import Meta from '../components/meta';
import Page from '../components/Page';
import { getAllShowSickPicks } from '../lib/getShows';

export async function getStaticProps() {
  const sickPicks = await getAllShowSickPicks();

  // No `revalidate` — incremental regeneration needs a running server, and
  // `output: 'export'` produces plain files. The data comes from markdown in
  // the repo, so a rebuild is the only way it can change anyway.
  return {
    props: {
      sickPicks,
    },
  };
}

export default class SickPicksPage extends React.Component {
  render() {
    const { sickPicks = [] } = this.props;

    return (
      <Page>
        <Meta staticPage={{ title: 'Sick Picks' }} />
        <div className="wrapper wrapper--text">
          {sickPicks.map((sickPick) => (
            <div
              key={sickPick.id}
              dangerouslySetInnerHTML={{ __html: sickPick.html }} //eslint-disable-line
            />
          ))}
        </div>
      </Page>
    );
  }
}

SickPicksPage.propTypes = {
  sickPicks: PropTypes.array.isRequired,
};
