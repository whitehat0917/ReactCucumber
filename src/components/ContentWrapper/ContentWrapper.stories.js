import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import ContentWrapper from './ContentWrapper';

const Child = styled.div`
  width: 100%;
  min-height: 10rem;
  height: 100%;
  background-color: #f5f5f5;
`;

storiesOf('atoms/ContentWrapper', module)
  .add('default', () => <ContentWrapper><Child /></ContentWrapper>)
  .add('full height', () => <ContentWrapper fullHeight><Child /></ContentWrapper>)
  .add('with paddings', () => <ContentWrapper withPaddings><Child /></ContentWrapper>)
  .add('with full height and paddings', () => <ContentWrapper fullHeight withPaddings><Child /></ContentWrapper>);
