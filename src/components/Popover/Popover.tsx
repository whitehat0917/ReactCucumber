import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Manager, Reference, Popper } from 'react-popper';

const Paper = styled.div`
  margin-top: 0.625rem;
  background: ${({ theme }) => theme.palette.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  width: ${({ width }) => `${width}rem`};
  max-height: ${({ maxHeight }) => `${maxHeight}rem`};
  z-index: 5;
  overflow: auto;
`;

const Backdrop = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;

const ReferenceBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

class Popover extends Component {
  state = {
    opened: false,
  }

  handleAnchorClick = (e) => {
    e.stopPropagation();
    const { opened } = this.state;
    const { onOpen, onClose } = this.props;
    if (onOpen && !opened) onOpen();
    if (onClose && opened) onClose();
    this.setState({ opened: !opened });
  }

  handlePaperClick = (e) => {
    e.stopPropagation();
    const { onClick } = this.props;
    if (onClick) {
      onClick();
      this.setState({ opened: false });
    }
  }

  handleBackdropClick = (e) => {
    e.stopPropagation();
    const { onClose } = this.props;
    this.setState({ opened: false });
    if (onClose) onClose();
  }

  render() {
    const {
      ReferenceElement,
      placement,
      children,
      width,
      maxHeight,
      offset,
    } = this.props;

    const { opened } = this.state;

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <ReferenceBox ref={ref} onClick={this.handleAnchorClick}>
              <ReferenceElement />
            </ReferenceBox>
          )}
        </Reference>
        {
          opened && ReactDOM.createPortal(
            <Popper
              positionFixed
              placement={placement || 'bottom'}
              modifiers={{
                flip: { enabled: false },
                preventOverflow: { boundariesElement: 'window' },
                offset: { offset },
                hide: { enabled: true },
              }}
            >
              {
                opened && (({ ref, style, placement: dataPlacement }) => (
                  <Fragment>
                    <Paper
                      ref={ref}
                      style={style}
                      data-placement={dataPlacement}
                      width={width}
                      maxHeight={maxHeight}
                      onClick={this.handlePaperClick}
                    >
                      {children}
                    </Paper>
                    <Backdrop onClick={this.handleBackdropClick} />
                  </Fragment>
                ))
              }
            </Popper>,
            document.querySelector('#app'),
          )
        }
      </Manager>
    );
  }
}

Popover.defaultProps = {
  width: 12.5,
  offset: '10px',
};

Popover.propTypes = {
  width: PropTypes.number,
  maxHeight: PropTypes.number,
  ReferenceElement: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
  placement: PropTypes.string,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.any,
  offset: PropTypes.string,
};

export default Popover;
