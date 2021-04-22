import React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';

const Wrapper = styled.a`
  width: 8.43rem;
  height: 2.75rem;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const TextWrapper = styled.div`
  margin-left: 0.65rem;
`;

const ITUNES_LINK = 'https://itunes.apple.com/us/app/marcel-art/id1416032467?mt=8';

const AppStoreLink = () => (
  <Wrapper href={ITUNES_LINK}>
    <Icon clickable size={1.75}>apple</Icon>
    <TextWrapper>
      <Icon
        clickable
        style={{
          display: 'block',
          height: '0.46rem',
          width: '5.25rem',
          marginBottom: '0.325rem',
        }}
      >
        apple_download
      </Icon>
      <Icon
        clickable
        style={{
          display: 'block',
          height: '1.0625rem',
          width: '5.25rem',
        }}
      >
        apple_app_store
      </Icon>
    </TextWrapper>
  </Wrapper>
);

export default AppStoreLink;
