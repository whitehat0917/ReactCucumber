/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'atoms/Link';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;

const NavigationWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NavigationLink = styled(Link)`
  opacity: 1;
  &.selected {
    opacity: 0.5;
  }
`;

const AdminHeader = ({
  isLoggedIn, onLogoutClick, ...props
}) => (
  <Wrapper {...props}>
    {
      isLoggedIn && (
        <NavigationWrapper>
          <NavigationLink
            fontFamily="secondary"
            color="default"
            exact
            to="/admin/feed"
            activeClassName="selected"
          >
            Admin feed
          </NavigationLink>
          <NavigationLink
            fontFamily="secondary"
            color="default"
            exact
            to="/admin/discover"
            activeClassName="selected"
            style={{ marginLeft: '2.25rem' }}
          >
            Admin discover
          </NavigationLink>
          <Link fontFamily="secondary" type="pseudo" onClick={onLogoutClick} style={{ marginLeft: '4rem' }}>Logout</Link>
        </NavigationWrapper>
        // <Icon size={2.625}>marcel_v2</Icon>
      )
    }
  </Wrapper>
);

AdminHeader.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLogoutClick: PropTypes.func,
};

export default AdminHeader;
