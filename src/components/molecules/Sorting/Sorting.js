import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Typography from 'atoms/Typography';
import Icon from 'atoms/Icon';
import Popover from 'molecules/Popover';

const StyledTypography = (props) => (
  <Typography
    type="caption"
    style={{ letterSpacing: '0.13rem', textTransform: 'uppercase' }}
    {...props}
  />
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SelectedSortingWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const OptionsWrapper = styled.div`
  padding: 1rem;
`;

const OptionWrapper = styled.div`
  cursor: pointer;
  padding: 0.2rem 0;
`;

const Option = ({
  selected, value, label, order, onClick,
}) => (
  <OptionWrapper onClick={() => { onClick({ key: value, order }); }}>
    <StyledTypography color={selected ? 'primary' : 'default'}>
      {label}
    </StyledTypography>
  </OptionWrapper>
);
Option.propTypes = {
  selected: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  order: PropTypes.string,
  onClick: PropTypes.func,
};

const options = [
  { value: 'uploaded', order: 'desc', label: 'Uploaded: newest first' },
  { value: 'uploaded', order: 'asc', label: 'Uploaded: oldest first' },
  { value: 'price', order: 'desc', label: 'Price: low to high' },
  { value: 'price', order: 'asc', label: 'Price: High to low' },
  { value: 'size', order: 'desc', label: 'Size: small to big' },
  { value: 'size', order: 'asc', label: 'Size: Big to small' },
];

const Sorting = ({ order, sortBy, onSortChange }) => (
  <Wrapper>
    <StyledTypography color="muted">
      Sort by:
      {'\u00a0'}
    </StyledTypography>
    <Popover
      width={15}
      maxHeight={12.5}
      offset="-10px"
      placement="bottom-start"
      ReferenceElement={() => (
        <SelectedSortingWrapper>
          <StyledTypography>
            {sortBy}
            {'\u00a0'}
          </StyledTypography>
          <Icon clickable size={0.75}>{order === 'asc' ? 'sort_asc' : 'sort_desc'}</Icon>
        </SelectedSortingWrapper>
      )}
    >
      <OptionsWrapper>
        {
          options.map((option) => (
            <Option
              key={option.label}
              selected={(order === option.order) && (sortBy === option.value)}
              onClick={onSortChange}
              {...option}
            />
          ))
        }
      </OptionsWrapper>
    </Popover>
  </Wrapper>
);

Sorting.defaultProps = {
  order: 'desc',
  sortBy: 'uploaded',
};

Sorting.propTypes = {
  order: PropTypes.string,
  sortBy: PropTypes.string,
  onSortChange: PropTypes.func.isRequired,
};

export default Sorting;
