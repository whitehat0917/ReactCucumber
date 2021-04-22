import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from 'atoms/Typography';
import Calendar from 'molecules/Calendar';

const Container = styled.div`
  width: 100%;
  align-items: center;
  margin-bottom: 3.25rem;
`;

const AdminContentHeader = ({ title, selectedDate, onDateChange }) => (
  <Container>
    <Typography fontFamily="secondary" weight="bold">{title}</Typography>
    {
      selectedDate
      && <Calendar selected={selectedDate} onChange={onDateChange} />
    }
  </Container>
);

AdminContentHeader.propTypes = {
  title: PropTypes.string,
  selectedDate: PropTypes.object,
  onDateChange: PropTypes.func,
};

export default AdminContentHeader;
