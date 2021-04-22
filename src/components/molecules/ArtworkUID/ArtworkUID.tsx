import React from 'react';
import styled from 'styled-components';
import Typography from 'components/Typography';
import Icon from 'components/Icon';

const UidContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UidLabel = styled((props) => <Typography type="caption" color="muted" {...props} />)`
  margin-left: 0.5rem;
`;

interface IArtworkUIDProps {
  id: string
}

const ArtworkUID: React.FC<IArtworkUIDProps> = ({ id }) => (
  <UidContainer>
    <Icon size={1.5}>uid</Icon>
    <UidLabel>{id}</UidLabel>
  </UidContainer>
);

export default ArtworkUID;
