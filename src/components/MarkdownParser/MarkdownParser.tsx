import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: ${({ theme }) => theme.palette.gray[100]};

  h1, h2, h3 {
    font-size: 2.25rem !important;
    font-family: ${({ theme }) => theme.fonts.primaryHeavy} !important;
    margin-bottom: 2.25rem;
    margin-top: 3.75rem;

    &:first-child {
      margin-top: 0;
    }
  }

  p, span, div, ul, li, td, th, tr {
    font-size: 1.25rem !important;
    letter-spacing: 0.01rem;
    font-family: ${({ theme }) => theme.fonts.primary} !important;
    margin: 0;
  }

  @media only screen and (max-width: 991px) { 
    h1, h2, h3 {
      font-size: 1.5rem !important;
      margin-bottom: 0.9375rem;
      margin-top: 1.6875rem;
    }

    p, span, div, ul, li, td, th, tr {
      font-size: 1.0625rem !important;
    }
  }
`;

const MarkdownParser = ({ source }) => (
  <Wrapper>
    <ReactMarkdown source={source} escapeHtml={false} />
  </Wrapper>
);

MarkdownParser.propTypes = {
  source: PropTypes.string.isRequired,
};

export default MarkdownParser;
