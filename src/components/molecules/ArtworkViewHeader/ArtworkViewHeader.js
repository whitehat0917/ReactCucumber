import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Responsive from 'react-responsive';
import NumberFormat from 'react-number-format';
import Typography from 'atoms/Typography';
import ShareButton from 'molecules/ShareButton';
import { CATEGORIES, STATUSES } from 'constants/artworks';
import { getCurrency } from 'utils/artworks';

const Desktop = (props) => <Responsive {...props} minWidth={769} />;
const Mobile = (props) => <Responsive {...props} maxWidth={768} />;

const SmallTypography = (props) => (
  <Fragment>
    <Desktop>
      <Typography type="small" color="muted" {...props} />
    </Desktop>
    <Mobile>
      <Typography
        style={{ marginTop: '0.25rem' }}
        type="small"
        fontSize="0.8125rem"
        color="muted"
        {...props}
      />
    </Mobile>
  </Fragment>
);

const SubheadingTypography = (props) => (
  <Fragment>
    <Desktop>
      <Typography type="body1" fontSize="1.375rem" weight="800" color="white" {...props} />
    </Desktop>
    <Mobile>
      <Typography type="body1" fontSize="1.125rem" weight="800" color="white" {...props} />
    </Mobile>
  </Fragment>
);

const ShortInfo = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  height: 2.5rem;
  flex-wrap: wrap;
  @media only screen and (max-width: 768px) {
    height: auto;
  }
`;

const HeaderWrapper = styled.div`
  height: 7.25rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-shrink: 0;

  @media only screen and (max-width: 768px) {
    padding: 0 1.5rem;
    flex-shrink: 1;
  }
`;

const InfoWrapper = styled.div`
  flex: 1 0 auto;
`;

const ButtonWrapper = styled.div`
  width: 8rem;
  margin-right: 1rem;
`;

const Header = ({
  artwork, onSharingButtonClick, ...props
}) => (artwork ? (
  <HeaderWrapper {...props}>
    <InfoWrapper>
      <SubheadingTypography>
        {
          [artwork.title || '', artwork.year].filter((val) => val).join(', ')
        }
      </SubheadingTypography>
      <ShortInfo>
        <SmallTypography>
          {CATEGORIES[artwork.category] ? CATEGORIES[artwork.category].label : ''}
        </SmallTypography>
        <SmallTypography>
          {
            (artwork.height || artwork.width || artwork.depth)
              ? `${[artwork.height || 0, artwork.width || 0, artwork.depth || 0]
                .map((num) => Number(num).toFixed(1))
                .join(' x ')
              } ${artwork.metric === 2 ? 'in' : 'cm'}` : ''
          }
        </SmallTypography>
        <SmallTypography>
          <NumberFormat
            displayType="text"
            value={artwork.price}
            thousandSeparator
            prefix={getCurrency(artwork.artist_data.currency)} 
            decimalScale={2}
            fixedDecimalScale={false}
          />
        </SmallTypography>
        <SmallTypography>
          {artwork.current_location ? `Stored in ${artwork.current_location}` : ''}
        </SmallTypography>
        <SmallTypography>
          {STATUSES[artwork.status] ? STATUSES[artwork.status].label : ''}
        </SmallTypography>
      </ShortInfo>
    </InfoWrapper>
    <Desktop>
      <ButtonWrapper>
        <ShareButton
          width={8}
          url={window.location.href}
          name={artwork.artist}
          onClick={onSharingButtonClick}
        />
      </ButtonWrapper>
    </Desktop>
  </HeaderWrapper>
) : null);

Header.propTypes = {
  artwork: PropTypes.object,
  onSharingButtonClick: PropTypes.func.isRequired,
};

export default Header;
