import PropTypes from 'prop-types';
import styled from 'styled-components';

const colorChooser = ({ type, theme }) => {
  switch (type) {
    case 'success':
      return theme.palette.success;
    case 'error':
      return theme.palette.error;
    default:
      return theme.palette.gray[100];
  }
};

const NotificationContainer = styled.div`
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  padding: 0.75rem 1.5rem;
  background-color: ${colorChooser};
`;

NotificationContainer.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'default']),
};

export default NotificationContainer;
