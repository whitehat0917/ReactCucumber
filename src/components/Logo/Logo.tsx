import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 3.2rem;
  justify-content: space-between;
`;
interface ILogo {
  iconOnly?: boolean
}

const Logo: React.FC<ILogo> = ({ iconOnly }) => (
  <StyledLink to="/">
    <LogoWrapper>
      <Icon size={3.2} clickable>{iconOnly ? 'marcel_v2_icon' : 'marcel_v2'}</Icon>
    </LogoWrapper>
  </StyledLink>
);

export default Logo;
