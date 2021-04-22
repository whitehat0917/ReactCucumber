import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Snackbar from './Snackbar';

const Child = styled.div`
  width: 10rem;
  background-color: grey;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  padding: 0.75rem 1.5rem;
`;

storiesOf('molecules/Snackbar', module)
  .add('default', () => (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open
      onExited={action('exited')}
      autoHideDuration={300}
      onClose={action('closed')}
    >
      <Child />
    </Snackbar>));
