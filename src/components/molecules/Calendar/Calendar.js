import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import Typoraphy from 'atoms/Typography';

import 'react-datepicker/dist/react-datepicker.css';

const Wrapper = styled.div`
  .paper {
    margin-top: 0.625rem;
    background: ${({ theme }) => theme.palette.white};
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 7px;
    padding: 0.625rem;
    border: none;
    font-size: 0.875rem;
    font-family: ${({ theme }) => theme.fonts.primary};
  }

  .react-datepicker__triangle {
    display: none;
  }
  
  .react-datepicker__day--selected {
    background-color: ${({ theme }) => theme.palette.primary[30]};
    &:hover {
      background-color: ${({ theme }) => theme.palette.primary[30]};
    }
  }

  .react-datepicker__day--outside-month {
    color: ${({ theme }) => theme.palette.gray[50]};
  }

  .react-datepicker__header {
    border: none;
    background-color: unset;
  }

  .react-datepicker__day-name {
    color: ${({ theme }) => theme.palette.gray[50]};
  }

  .react-datepicker__current-month {
    font-weight: 600;
    font-size: 0.875rem;
  }
`;

const CustomInput = styled(({ value, ...props }) => (
  <Typoraphy weight="bold" color="primary" type="small" {...props}>
    {value}
  </Typoraphy>
))`
  cursor: pointer;
`;

const Calendar = (props) => (
  <Wrapper>
    <DatePicker
      customInput={<CustomInput />}
      dateFormat="MMMM d, yyyy"
      calendarClassName="paper"
      dayClassName={() => 'day'}
      {...props}
    />
  </Wrapper>
);

Calendar.propTypes = {
  selected: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Calendar;
