/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import Slide from 'components/Slide';
import styled, { css } from 'styled-components';
import capitalize from 'lodash/capitalize';

const getPositionSpecificStyles = (position) => {
  const GUTTER = '1.5rem';
  const top = css`
    top: ${({ gutter }) => gutter || GUTTER};
  `;
  const bottom = css`
    bottom: ${({ gutter }) => gutter || GUTTER};
  `;
  const right = css`
    justify-content: flex-end;
    right: ${({ gutter }) => gutter || GUTTER};
  `;
  const left = css`
    justify-content: flex-start;
    left: ${({ gutter }) => gutter || GUTTER};
  `;
  const center = `
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  `;

  switch (position) {
    case 'anchorOriginTopCenter':
      return css`
        ${top}
        ${center}
      `;
    case 'anchorOriginBottomCenter':
      return css`
        ${bottom}
        ${center}
      `;
    case 'anchorOriginTopRight':
      return css`
        ${top}
        ${right}
        left: auto;
      `;
    case 'anchorOriginBottomRight':
      return css`
        ${bottom}
        ${right}
        left: auto;
      `;

    case 'anchorOriginTopLeft':
      return css`
        ${top}
        ${left}
        right: auto;
      `;
    case 'anchorOriginBottomLeft':
      return css`
        ${bottom}
        ${left}
        right: auto;
      `;
    default:
      return '';
  }
};

const Wrapper = styled.div`
  z-index: 999;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ position }) => getPositionSpecificStyles(position)}
`;

class Snackbar extends React.Component {
  componentDidMount() {
    // console.log('clearTimeout -> ', this.props);
    if (this.props.open) {
      this.setAutoHideTimer();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      if (this.props.open) {
        this.setAutoHideTimer();
      } else {
        clearTimeout(this.timerAutoHide);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerAutoHide);
  }

  setAutoHideTimer(autoHideDuration) {
    const autoHideDurationBefore = autoHideDuration != null ? autoHideDuration : this.props.autoHideDuration;

    if (!this.props.onClose || autoHideDurationBefore == null) {
      return;
    }

    clearTimeout(this.timerAutoHide);
    this.timerAutoHide = setTimeout(() => {
      const autoHideDurationAfter = autoHideDuration != null ? autoHideDuration : this.props.autoHideDuration;
      if (!this.props.onClose || autoHideDurationAfter == null) {
        return;
      }

      this.props.onClose(null, 'timeout');
    }, autoHideDurationBefore);
  }

  handleMouseEnter = (event) => {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
    this.handlePause();
  };

  handleMouseLeave = (event) => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
    this.handleResume();
  };


  handlePause = () => {
    clearTimeout(this.timerAutoHide);
  };

  handleResume = () => {
    if (this.props.autoHideDuration != null) {
      this.setAutoHideTimer(this.props.autoHideDuration * 0.5);
    }
  };

  render() {
    const {
      anchorOrigin: { vertical, horizontal },
      autoHideDuration,
      children,
      onClose,
      onEnter,
      onEntered,
      onEntering,
      onExit,
      onExited,
      onExiting,
      onMouseEnter,
      onMouseLeave,
      open,
      TransitionComponent,
      transitionDuration,
      TransitionProps,
      ...other
    } = this.props;

    return (
      <TransitionComponent
        appear
        in={open}
        onEnter={onEnter}
        onEntered={onEntered}
        onEntering={onEntering}
        onExit={onExit}
        onExited={onExited}
        onExiting={onExiting}
        timeout={transitionDuration}
        direction={vertical === 'top' ? 'down' : 'up'}
        {...TransitionProps}
      >
        <Wrapper
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          position={`anchorOrigin${capitalize(vertical)}${capitalize(horizontal)}`}
          {...other}
        >
          <EventListener
            target="window"
            onFocus={this.handleResume}
            onBlur={this.handlePause}
          />
          { children }
        </Wrapper>
      </TransitionComponent>
    );
  }
}

Snackbar.propTypes = {
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
    vertical: PropTypes.oneOf(['top', 'bottom']).isRequired,
  }),
  autoHideDuration: PropTypes.number,
  children: PropTypes.element,
  key: PropTypes.any,
  onClose: PropTypes.func,
  onEnter: PropTypes.func,
  onEntered: PropTypes.func,
  onEntering: PropTypes.func,
  onExit: PropTypes.func,
  onExited: PropTypes.func,
  onExiting: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  open: PropTypes.bool,
  TransitionComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  transitionDuration: PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
  TransitionProps: PropTypes.object,
};

Snackbar.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  TransitionComponent: Slide,
};

export default Snackbar;
