/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import NotificationContainer from './NotificationContainer';

const Child = styled.div`
  width: 10rem;
  height: 2rem;
`;

storiesOf('atoms/NotificationContainer', module)
  .add('default', () => <NotificationContainer><Child /></NotificationContainer>)
  .add('succeed notification', () => <NotificationContainer type="success"><Child /></NotificationContainer>)
  .add('errored notification', () => <NotificationContainer type="error"><Child /></NotificationContainer>);
