import React from 'react';
import PropTypes from 'prop-types';
import AdminPageTemplate from 'templates/AdminPageTemplate';
import FeedAdmin from 'containers/FeedAdmin';
import DiscoverAdmin from 'containers/DiscoverAdmin';

const AdminPage = ({ computedMatch }) => (
  <AdminPageTemplate fullHeight tab={computedMatch.params.tab}>
    {computedMatch.params.tab === 'feed' && <FeedAdmin />}
    {computedMatch.params.tab === 'discover' && <DiscoverAdmin />}
  </AdminPageTemplate>
);

AdminPage.propTypes = {
  computedMatch: PropTypes.shape({
    params: PropTypes.shape({
      tab: PropTypes.oneOf(['feed', 'discover']).isRequired,
    }).isRequired,
  }).isRequired,
};

export default AdminPage;
