import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from 'atoms/Typography';
import Button from 'atoms/Button';
import Icon from 'atoms/Icon';
import Chip from 'atoms/Chip';
import { CATEGORIES, STATUSES } from 'constants/artworks';

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 3.375rem;
`;

const ButtonsWrapper = styled.div`
  margin-left: auto;
  display: flex;
`;

const ButtonTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChipsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap-reverse;
  margin-left: auto;
  align-items: center;
`;

const ChipsContainer = styled.div`
  display: flex;
  height: 3rem;
  flex-grow: 1;
  padding: 0 1rem;
  overflow: hidden;
`;

const renderCategories = (categories, onChipDelete) => categories.map((category) => (
  <Chip
    key={`category-${CATEGORIES[category].value}`}
    label={CATEGORIES[category].label}
    onDelete={onChipDelete('categories', CATEGORIES[category].value)}
  />
));

const renderStatuses = (statuses, onChipDelete) => statuses.map((status) => (
  <Chip
    key={`status-${STATUSES[status].value}`}
    label={STATUSES[status].label}
    onDelete={onChipDelete('statuses', STATUSES[status].value)}
  />
));

const renderYears = (years, onChipDelete) => years.map((year) => (
  <Chip
    key={`year-${year}`}
    label={year}
    onDelete={onChipDelete('years', year)}
  />
));

const renderPrice = (price, onChipDelete) => {
  if (price.min == null && price.max == null) {
    return null;
  }
  if (price.min != null && price.max != null) {
    return (
      <Chip label={`$${price.min} — $${price.max}`} onDelete={onChipDelete('price')} />
    );
  }
  if (price.min !== null) {
    return (
      <Chip label={`> $${price.min}`} onDelete={onChipDelete('price')} />
    );
  }
  return (
    <Chip label={`< $${price.max}`} onDelete={onChipDelete('price')} />
  );
};

const PortfolioHeader = ({ onFilterButtonClick, filters, onChipDelete }) => (
  <Container>
    <Typography type="h3">My Portfolio</Typography>
    <ChipsContainer>
      <ChipsWrapper>
        { renderCategories(filters.categories, onChipDelete) }
        { renderStatuses(filters.statuses, onChipDelete) }
        { renderYears(filters.years, onChipDelete) }
        { renderPrice(filters.price, onChipDelete) }
      </ChipsWrapper>
    </ChipsContainer>
    <ButtonsWrapper>
      <Button size="small" styleType="gray" onClick={onFilterButtonClick}>
        <ButtonTextWrapper>
          <Icon clickable size={1.25}>filter</Icon>
          Filter
        </ButtonTextWrapper>
      </Button>
    </ButtonsWrapper>
  </Container>
);

PortfolioHeader.propTypes = {
  onFilterButtonClick: PropTypes.func.isRequired,
  onChipDelete: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

export default PortfolioHeader;
