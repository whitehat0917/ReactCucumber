import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HeadRoom from 'react-headroom';
import Logo from 'molecules/Logo';
import ImpersonateModal from 'containers/ImpersonateModal';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.5rem;
  transition: height 0.3s ease-in-out;
`;

const PageHeaderMobile = ({ impersonateStatus }) => (
  <HeadRoom>
    <Wrapper>
      <ImpersonateModal impersonateStatus={impersonateStatus} />
      <Logo />
    </Wrapper>
  </HeadRoom>
);

PageHeaderMobile.propTypes = {
  impersonateStatus: PropTypes.object.isRequired,
};

export default PageHeaderMobile;
