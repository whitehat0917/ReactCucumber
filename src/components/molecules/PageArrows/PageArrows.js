import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import Typography from 'atoms/Typography';
import Icon from 'atoms/Icon';

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 25rem;
`;

const ButtonWrapper = styled.div`
  cursor: pointer;
  width: 10rem;
  height: 3rem;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${({ theme }) => theme.palette.gray[20]};
  }
`;

const PageArrows = ({
  prevValue, nextValue, onPrevClick, onNextClick,
}) => (
  <Wrapper>
    <ButtonsWrapper>
      {
        prevValue && onPrevClick
        && (
        <ButtonWrapper onClick={() => { onPrevClick(prevValue); }}>
          <Icon clickable size="small" style={{ marginRight: '1.25rem' }}>arrow_left</Icon>
          <Typography>{moment(prevValue).format('Do MMM')}</Typography>
        </ButtonWrapper>
        )
      }
      {
        nextValue && onNextClick
        && (
          <ButtonWrapper onClick={() => { onNextClick(nextValue); }}>
            <Typography>{moment(nextValue).format('Do MMM')}</Typography>
            <Icon clickable size="small" style={{ marginLeft: '1.25rem' }}>arrow_right</Icon>
          </ButtonWrapper>
        )
      }
    </ButtonsWrapper>
  </Wrapper>
);

PageArrows.propTypes = {
  prevValue: PropTypes.object,
  nextValue: PropTypes.object,
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,
};

export default PageArrows;
