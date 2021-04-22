import React from 'react';
import styled, { keyframes } from 'styled-components';


const Loading = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const Bounce = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${({ theme }) => theme.palette.gray[50]};
  border-radius: 50%;
  margin: 0.2rem;

  animation: ${Loading} 1.4s infinite ease-in-out both;
`;

const MinorLoader = () => (
  <div style={{
    height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}
  >
    <Bounce style={{ animationDelay: '-0.64s' }} />
    <Bounce style={{ animationDelay: '-0.32s' }} />
    <Bounce style={{ animationDelay: '-0.16s' }} />
    <Bounce />
  </div>
);

export default MinorLoader;
