import styled from 'styled-components';

export default styled.div`
  height: ${({ fullHeight, withPaddings }) => {
    if (fullHeight && withPaddings) {
      return 'calc(100vh - 13.125rem)';
    }
    if (fullHeight) {
      return 'calc(100vh - 8.25rem)';
    }
    return 'inherit';
  }};
  ${({ withPaddings }) => (
    withPaddings ? 'padding-top: 3.625rem; padding-bottom: 1.25rem;' : ''
  )}
`;
