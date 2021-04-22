import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import Drawer from './Drawer';

const Child = styled.div`
  width: 10rem;
  background-color: #f5f5f5;
`;

storiesOf('molecules/Drawer', module)
  .add('default', () => <Drawer open><Child /></Drawer>)
  .add('left position', () => <Drawer open position="left"><Child /></Drawer>);
