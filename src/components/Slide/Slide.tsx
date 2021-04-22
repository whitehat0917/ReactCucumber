/* eslint-disable no-param-reassign,react/destructuring-assignment,import/no-named-as-default-member */
import React from 'react';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import debounce from 'lodash/debounce';
import Transition from 'react-transition-group/Transition';

const reflow = (node) => node.scrollTop;
const GUTTER = 24;

function getTranslateValue(props, node) {
  const { direction } = props;
  const rect = node.getBoundingClientRect();

  const computedStyle = window.getComputedStyle(node);
  const transform = computedStyle.getPropertyValue('-webkit-transform')
    || computedStyle.getPropertyValue('transform');

  let offsetX = 0;
  let offsetY = 0;

  if (transform && transform !== 'none' && typeof transform === 'string') {
    const transformValues = transform
      .split('(')[1]
      .split(')')[0]
      .split(',');
    offsetX = parseInt(transformValues[4], 10);
    offsetY = parseInt(transformValues[5], 10);
  }

  if (direction === 'left') {
    return `translateX(100vw) translateX(-${rect.left - offsetX}px)`;
  }

  if (direction === 'right') {
    return `translateX(-${rect.left + rect.width + GUTTER - offsetX}px)`;
  }

  if (direction === 'up') {
    return `translateY(100vh) translateY(-${rect.top - offsetY}px)`;
  }

  return `translateY(-${rect.top + rect.height + GUTTER - offsetY}px)`;
}

export function setTranslateValue(props, node) {
  const transform = getTranslateValue(props, node);

  if (transform) {
    node.style.webkitTransform = transform;
    node.style.transform = transform;
  }
}

class Slide extends React.Component {
  constructor() {
    super();
    if (typeof window !== 'undefined') {
      this.handleResize = debounce(() => {
        if (this.props.in || this.props.direction === 'down' || this.props.direction === 'right') {
          return;
        }
        if (this.transitionRef) {
          setTranslateValue(this.props, this.transitionRef);
        }
      }, 166); // Corresponds to 10 frames at 60 Hz.
    }
  }

  componentDidMount() {
    if (!this.props.in) {
      this.updatePosition();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.direction !== this.props.direction && !this.props.in) {
      this.updatePosition();
    }
  }

  handleEnter = (node) => {
    setTranslateValue(this.props, node);
    reflow(node);
    if (this.props.onEnter) {
      this.props.onEnter(node);
    }
  };

  handleEntering = (node) => {
    const { timeout } = this.props;
    node.style.webkitTransition = `-webkit-transform ${timeout.enter}ms cubic-bezier(0.0, 0, 0.2, 1)`;
    node.style.transition = `transform ${timeout.enter}ms cubic-bezier(0.0, 0, 0.2, 1)`;
    node.style.webkitTransform = 'translate(0, 0)';
    node.style.transform = 'translate(0, 0)';
    this.forceUpdate();
    if (this.props.onEntering) {
      this.props.onEntering(node);
    }
  };

  handleExit = (node) => {
    const { timeout } = this.props;
    node.style.webkitTransition = `-webkit-transform ${timeout.exit}ms cubic-bezier(0.4, 0, 0.6, 1)`;
    node.style.transition = `transform ${timeout.exit}ms cubic-bezier(0.4, 0, 0.6, 1)`;
    setTranslateValue(this.props, node);

    if (this.props.onExit) {
      this.props.onExit(node);
    }
  };

  handleExited = (node) => {
    node.style.webkitTransition = '';
    node.style.transition = '';

    if (this.props.onExited) {
      this.props.onExited(node);
    }
  };

  updatePosition() {
    if (this.transitionRef) {
      this.transitionRef.style.visibility = 'inherit';
      setTranslateValue(this.props, this.transitionRef);
    }
  }

  render() {
    const {
      children,
      onEnter,
      onEntering,
      onExit,
      onExited,
      style: styleProp,
      mountOnEnter,
      unmountOnExit,
      timeout,
      ...other
    } = this.props;

    const style = {
      ...styleProp,
      ...(React.isValidElement(children) ? children.props.style : {}),
    };

    return (
      <EventListener target="window" onResize={this.handleResize}>
        <Transition
          onEnter={this.handleEnter}
          onEntering={this.handleEntering}
          onExit={this.handleExit}
          onExited={this.handleExited}
          appear
          style={style}
          mountOnEnter={mountOnEnter}
          unmountOnExit={unmountOnExit}
          timeout={timeout}
          {...other}
        >
          {React.cloneElement(children, {
            ref: (ref) => {
              this.transitionRef = ref;
            },
          })}
        </Transition>
      </EventListener>
    );
  }
}

Slide.propTypes = {
  children: PropTypes.element.isRequired,
  direction: PropTypes.oneOf(['left', 'right', 'up', 'down']),
  in: PropTypes.bool,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onExit: PropTypes.func,
  onExited: PropTypes.func,
  style: PropTypes.object,
  timeout: PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
  mountOnEnter: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
};

Slide.defaultProps = {
  direction: 'up',
  timeout: {
    enter: 300,
    exit: 300,
  },
};

export default Slide;
