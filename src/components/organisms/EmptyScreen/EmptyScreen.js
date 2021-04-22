import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentWrapper from 'atoms/ContentWrapper';
import Typography from 'atoms/Typography';
import Button from 'atoms/Button';
import PortfolioHeader from 'containers/PortfolioHeader';

const FlexGrid = styled.div`
  padding-top: 3.625rem;
`;

const FlexRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
  height: 14rem;
  :last-child {
    margin-bottom: 0;
  }
`;

const MockImage = styled.div`
  opacity: 0.4;
  background-color: ${({ theme }) => theme.palette.gray[25]};
  margin-right: 2rem;
  flex-grow: 1;
  :last-child {
    margin-right: 0;
  }
`;

const FixedHeightWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const GradientOverlay = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  background-image: linear-gradient(358.79deg, ${({ theme }) => theme.palette.gray[10]} 25.31%, rgba(249, 249, 249, 0) 101.34%);
`;

class EmptyScreen extends PureComponent {
  handleUploadClick = () => {
    const { openUploadModal } = this.props;
    openUploadModal();
  }

  renderMockedGrid = () => (
    <FlexGrid>
      <FlexRow>
        {Array.from(Array(4).keys()).map((id) => (<MockImage key={id} />))}
      </FlexRow>
      <FlexRow>
        {Array.from(Array(4).keys()).map((id) => (<MockImage key={id} />))}
      </FlexRow>
    </FlexGrid>
  );

  renderOverlay = () => (
    <GradientOverlay>
      {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
      <Typography type="h1" style={{ textAlign: 'center' }}>
        Hey 👋. Upload your first artworks
      </Typography>
      <Button size="big" style={{ marginTop: '3rem' }} onClick={this.handleUploadClick}>
        Upload now
      </Button>
    </GradientOverlay>
  );

  render() {
    const { isFilterApplied } = this.props;

    if (isFilterApplied) {
      return (
        <ContentWrapper withPaddings>
          <PortfolioHeader />
          <Typography type="h4" color="muted">
            No artworks were found
          </Typography>
        </ContentWrapper>
      );
    }

    return (
      <ContentWrapper fullHeight>
        <FixedHeightWrapper>
          {this.renderMockedGrid()}
          {this.renderOverlay()}
        </FixedHeightWrapper>
      </ContentWrapper>
    );
  }
}

EmptyScreen.propTypes = {
  openUploadModal: PropTypes.func.isRequired,
  isFilterApplied: PropTypes.bool.isRequired,
};

export default EmptyScreen;
