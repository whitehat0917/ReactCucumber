import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LayoutContainer from 'atoms/LayoutContainer';
import PageHeader from 'containers/PageHeader';
import PageFooter from 'molecules/PageFooter';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  background-color: ${({ theme }) => theme.palette.white};
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray[25]};

  @media (max-width: 991px) {
    border-color: transparent;
  }
`;

const Content = styled.section`
  flex: 1 0 auto;
  width: 100%;
  margin: 0 auto 0;
  margin-top: 4.5rem;
`;

const Footer = styled.footer`
  z-index: 2;
  flex: 0 0 auto;
  height: 3.75rem;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.gray[10]};
  box-sizing: border-box;
`;

const GalleryPageTemplate = ({
  header, children, footer, fullwidth, fullHeight, history, isPublicGallery, ...props
}) => (
  <Wrapper className="PageTemplate__wrapper" {...props}>
    <Header>
      <LayoutContainer><PageHeader isPublicGallery={isPublicGallery} history={history} /></LayoutContainer>
    </Header>
    <Content fullwidth={fullwidth} fullHeight={fullHeight} id="pageContent">
      <LayoutContainer isPublicGallery={isPublicGallery} {...props}>{children}</LayoutContainer>
    </Content>
    <Footer>
      <PageFooter isPublicGallery={isPublicGallery} {...props} />
    </Footer>
  </Wrapper>
);

GalleryPageTemplate.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  isPublicGallery: PropTypes.bool,
  history: PropTypes.object,
};

export default GalleryPageTemplate;
