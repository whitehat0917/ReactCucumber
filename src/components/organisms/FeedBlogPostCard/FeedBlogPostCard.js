import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'atoms/Button';
import Icon from 'atoms/Icon';
import Typography from 'atoms/Typography';

const Wrapper = styled.div`
  display: flex;
  height: 22.5rem;
  flex-direction: column;
  padding: 1rem;
  ${
  ({ img, theme }) => (img
    ? `background: linear-gradient(0deg,rgba(0,0,0,0),rgba(0,0,0,0.6)), url(${img});`
    : `background: linear-gradient(0deg,${theme.palette.gradient.from}, ${theme.palette.gradient.to});`
  )}
  background-size: cover;
  border-radius: 7px;
  cursor: pointer;
`;

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: 'space-between';
  height: 2.5rem;
  align-items: center;
`;

const Publisher = styled.div`
  display: flex;
  align-items: center;
`;

const EditButton = styled(Button)`
  width: 4rem;
  height: 1.875rem;
  font-size: 0.875rem;
  line-height: 1.4375rem;
  text-align: center;
  color: ${({ theme }) => theme.palette.white};
  margin-left: auto;
  background-color: rgba(0,0,0,0);
  &:hover {
    background-color: rgba(0,0,0,0);
  }
`;

const FeedBlogPostCard = ({
  img, title, onEditClick, onPostClick,
}) => (
  <Wrapper img={img} onClick={onPostClick}>
    <CardHeader>
      <Publisher>
        <Icon clickable>marcel_square</Icon>
        <Typography fontFamily="secondary" style={{ marginLeft: '0.5rem' }} type="small" color="white">Marcel Team</Typography>
      </Publisher>
      <EditButton styleType="gray" onClick={onEditClick}>Edit</EditButton>
    </CardHeader>
    <Typography fontFamily="secondary" style={{ marginTop: '1rem' }} type="h4" color="white">{title || 'Untitled blog post'}</Typography>
  </Wrapper>
);

FeedBlogPostCard.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  onEditClick: PropTypes.func,
  onPostClick: PropTypes.func,
};

export default FeedBlogPostCard;
