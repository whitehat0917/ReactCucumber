import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import LayoutContainer from './LayoutContainer';

const Child = styled.div`
  width: 100%;
  min-height: 10rem;
  height: 100%;
  background-color: #f5f5f5;
`;

storiesOf('atoms/LayoutContainer', module)
  .add('default (max width = 75rem)', () => <LayoutContainer><Child /></LayoutContainer>)
  .add('non-fixed width (max width = 100%)', () => <LayoutContainer fixedWidth={false}><Child /></LayoutContainer>);
