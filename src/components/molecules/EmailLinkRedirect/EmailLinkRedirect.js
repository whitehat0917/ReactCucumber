import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'query-string';
import { isiOS } from 'utils/common';

// This component is used for redirecting user who came from the email link
// Depending on the device we either open web or native app
const EmailLinkRedirect = (props) => {
  const queryParams = qs.parse(window.location.search);
  const { username } = props.match.params;
  const { screen, ...rest } = queryParams;
  if (isiOS()) {
    window.location.href = `marcelforart://${screen}${Object.keys(rest).length > 0 ? '?' : ''}${qs.stringify(rest)}`;
    return null;
  }
  return (
    <Redirect to={`/${username}`} />
  );
};

EmailLinkRedirect.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(EmailLinkRedirect);
