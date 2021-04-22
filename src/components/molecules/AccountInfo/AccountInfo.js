import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from 'atoms/Avatar';
import Link from 'atoms/Link';
import Typography from 'atoms/Typography';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0.625rem;
`;

const AccountInfo = ({ src, name, onLogoutClick, onImpersonateClick }) => (
  <Wrapper>
    <div style={{ margin: '0.625rem' }}>
      <Avatar src={src} />
    </div>
    <div style={{ marginTop: '0.4rem' }}>
      <Typography type="small" id="userName">{name || ''}</Typography>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
      <Link type="pseudo" onClick={onLogoutClick}>Logout</Link>
      {onImpersonateClick && <Link type="pseudo" onClick={onImpersonateClick} color="#ff00ff"> Impersonate</Link>}
    </div>
  </Wrapper>
);

AccountInfo.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  onLogoutClick: PropTypes.func.isRequired,
  onImpersonateClick: PropTypes.func,
};

export default AccountInfo;
