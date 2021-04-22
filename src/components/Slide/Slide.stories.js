import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import Slide from './Slide';

const Child = styled.div`
  width: 10rem;
  height: 15rem;
  background-color: #f5f5f5;
`;

storiesOf('atoms/Slide', module)
  .add('default', () => (
    <Slide in><Child /></Slide>
  ))
  .add('slides from right side', () => (
    <Slide in direction="left"><Child /></Slide>
  ))
  .add('slides from left side', () => (
    <Slide in direction="right"><Child /></Slide>
  ))
  .add('slides from bottom', () => (
    <Slide in direction="up"><Child /></Slide>
  ))
  .add('slides from top', () => (
    <Slide in direction="down"><Child /></Slide>
  ))
  .add('with custom timeout', () => (
    <Slide in timeout={{ enter: 1000, exit: 1000 }}>
      <Child />
    </Slide>
  ));
