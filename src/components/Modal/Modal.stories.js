import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Modal from './Modal';

const Child = styled.div`
  width: 10rem;
  background-color: #f5f5f5;
`;


const props = {
  isOpen: true,
  onClose: action('closed'),
  onAfterOpen: action('opened'),
  onCancelClick: action('canceled'),
  onSubmitClick: action('submitted'),
  children: <Child />,
};

storiesOf('molecules/Modal', module)
  .add('default', () => <Modal {...props} />)
  .add('with title and subtitle', () => <Modal {...props} title="Title" subtitle="Subtitle" />)
  .add('with buttons', () => <Modal {...props} buttonsAreVisible />)
  .add('with custom submit text', () => <Modal {...props} buttonsAreVisible submitText="Submit text" />)
  .add('with disabled buttons', () => <Modal {...props} buttonsAreVisible submitIsDisabled cancelIsDisabled />)
  .add('loading state', () => <Modal {...props} buttonsAreVisible isLoading />)
  .add('full width and height', () => <Modal {...props} fullWidth fullHeight />);
