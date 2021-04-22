import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LayoutContainer from 'atoms/LayoutContainer';
import AdminHeader from 'containers/AdminHeader';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  height: 4rem;
  width: 100%;
  z-index: 2;
  background-color: ${({ theme }) => theme.palette.gray[10]};
`;

const Content = styled.section`
  flex: 1 0 auto;
  width: 100%;
  margin: 0 auto 0;
  margin-top: 4rem;
`;

const Footer = styled.footer`
  height: 3.75rem;
  flex: 0 0 auto;
`;

const AdminPageTemplate = ({
  header, children, footer, fullwidth, fullHeight, history, tab, ...props
}) => (
  <Wrapper className="AdminPageTemplate__wrapper" {...props}>
    <Header>
      <LayoutContainer><AdminHeader tab={tab} history={history} /></LayoutContainer>
    </Header>
    <Content fullwidth={fullwidth} fullHeight={fullHeight}>
      <LayoutContainer>{children}</LayoutContainer>
    </Content>
    <Footer />
  </Wrapper>
);

AdminPageTemplate.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  history: PropTypes.object,
};

export default AdminPageTemplate;
