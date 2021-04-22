import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import Typography from 'atoms/Typography';
import Icon from 'atoms/Icon';

const BaseStyle = css`
  cursor: pointer;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${({ theme }) => theme.palette.gray[20]};
  }
`;

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30rem;
  align-items: center;
`;

const ArrowWrapper = styled.div`
  ${BaseStyle}
  width: 3rem;
  height: 3rem;
`;

const PageNumber = styled.div`
  ${BaseStyle}
  width: 2.5rem;
  height: 3rem;
  background-color: ${({ selected }) => (selected ? 'white' : 'inherit')};
  border: ${({ selected }) => (selected ? '1px solid #C9CBCC' : 'inherit')};
`;

class Pagination extends Component {
  handlePrevClick = () => {
    const { currentPage } = this.props;
    const newPage = currentPage - 1;
    this.props.onPageChange(newPage > 1 ? newPage : 1);
  }

  handleNextClick = () => {
    const { currentPage, pages } = this.props;
    const newPage = currentPage + 1;
    this.props.onPageChange(newPage <= pages ? newPage : pages);
  }

  handlePageChange = (page) => () => {
    this.props.onPageChange(page);
  }

  render() {
    const { currentPage, pages } = this.props;
    const pageNumbers = [...Array(pages).keys()].map((page) => page + 1);
    const centerPages = pageNumbers.slice(currentPage > 3 ? currentPage - 3 : 0, currentPage + 2);
    const firstNumber = pageNumbers[0];
    const lastNumber = pageNumbers.slice(-1)[0];
    return (
      <Wrapper>
        <ButtonsWrapper>
          <ArrowWrapper onClick={this.handlePrevClick}>
            <Icon clickable size="small">arrow_left</Icon>
          </ArrowWrapper>
          <PageNumber
            selected={firstNumber === currentPage}
            onClick={this.handlePageChange(firstNumber)}
          >
            <Typography>{firstNumber}</Typography>
          </PageNumber>
          {
            centerPages[0] - firstNumber > 1
            && <Typography>...</Typography>
          }
          {
            centerPages.filter((page) => ![firstNumber, lastNumber].includes(page))
              .map((page) => (
                <PageNumber
                  key={page}
                  selected={page === currentPage}
                  onClick={this.handlePageChange(page)}
                >
                  <Typography>{page}</Typography>
                </PageNumber>
              ))
          }
          {
            lastNumber - centerPages[centerPages.length - 1] > 1
            && <Typography>...</Typography>
          }
          <PageNumber
            selected={lastNumber === currentPage}
            onClick={this.handlePageChange(lastNumber)}
          >
            <Typography>{lastNumber}</Typography>
          </PageNumber>
          <ArrowWrapper onClick={this.handleNextClick}>
            <Icon clickable size="small">arrow_right</Icon>
          </ArrowWrapper>
        </ButtonsWrapper>
      </Wrapper>
    );
  }
}


Pagination.propTypes = {
  pages: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
