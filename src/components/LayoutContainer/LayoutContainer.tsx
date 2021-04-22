import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  overflow: auto;
`;

const ContentContainer = styled.div`
  min-width: 280px;
  width: ${({ fixedWidth }) => (fixedWidth ? '75rem' : '100%')};
  margin: 0 5rem;
  @media (min-width: 280px) and (max-width: 769px) {
    margin: ${({ isPublicGallery }) => (isPublicGallery ? '0' : '0 1rem')};
  }

  @media (max-width: 1400px) {
    width: fill-available;
  }
`;

const LayoutContainer = ({ fixedWidth, children, ...props }) => (
  <FlexWrapper>
    <ContentContainer fixedWidth={fixedWidth} {...props}>
      {children}
    </ContentContainer>
  </FlexWrapper>
);

LayoutContainer.defaultProps = {
  fixedWidth: true,
};

LayoutContainer.propTypes = {
  children: PropTypes.any,
  fixedWidth: PropTypes.bool,
};

export default LayoutContainer;
