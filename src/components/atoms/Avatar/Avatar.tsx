import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from 'atoms/Icon';

const Wrapper = styled.div`
  border-radius: ${({ type }) => (type === 'square' ? '0.625rem' : '50%')};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  overflow: hidden;
  background-color: ${({ src, theme }) => (!src ? theme.palette.gray[20] : 'none')};
  flex-shrink: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  text-align: center;
`;

class Avatar extends Component {
  state = {
    error: false,
  }

  render() {
    const {
      src, type, size, iconSize: propIconSize, ...props
    } = this.props;
    const { error } = this.state;
    let wrapperSize = size;
    let iconSize = propIconSize;
    if (!size) {
      wrapperSize = type === 'square' ? 7.25 : 2.25;
      iconSize = type === 'square' ? 'big' : 'small';
    }
    return (
      <Wrapper type={type} size={wrapperSize}>
        {Boolean(src) && !error
          && (
            <Image
              src={src}
              {...props}
              onError={(e) => {
                e.target.onerror = null;
                this.setState({ error: true });
              }}
            />
          )}
        {(!src || error) && <Icon size={iconSize}>marcel_gray</Icon>}
      </Wrapper>
    );
  }
}

Avatar.defaultProps = {
  type: 'circle',
};

Avatar.propTypes = {
  src: PropTypes.string,
  type: PropTypes.oneOf([
    'circle',
    'square',
  ]),
  size: PropTypes.number,
  iconSize: PropTypes.string,
};

export default Avatar;
