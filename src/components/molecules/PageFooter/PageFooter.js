import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LayoutContainer from 'atoms/LayoutContainer';
import Typography from 'atoms/Typography';
import Button from 'atoms/Button';

const Link = styled.a`
  text-decoration: none;
`;

const FooterContent = styled(LayoutContainer)`
  border-top: 1px solid ${({ theme }) => theme.palette.gray[20]};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PageFooter = ({ isPublicGallery }) => (
  <FooterContent>
    <FlexContainer style={{ width: '10rem' }}>
      {
        isPublicGallery && (
          <Button
            size="dense"
            fontWeight={300}
            style={{ fontSize: '0.6875rem', padding: '0 0.5rem' }}
            onClick={() => window.open('https://go.onelink.me/app/818cf2e2', '_self')}
          >
            Get Marcel for iOS
          </Button>
        )
      }
    </FlexContainer>
    <FlexContainer style={{ width: '13rem' }}>
      {/* <Link target="_blank" rel="noopener noreferrer" href="https://www.marcelforart.com/privacy-policy/">
        <Typography color="muted" type="caption">Privacy Policy</Typography>
      </Link>
      <Link target="_blank" rel="noopener noreferrer" href="https://www.marcelforart.com/terms/">
        <Typography color="muted" type="caption">User Agreement</Typography>
      </Link> */}
    </FlexContainer>
  </FooterContent>
);

PageFooter.propTypes = {
  isPublicGallery: PropTypes.bool,
};

export default PageFooter;
