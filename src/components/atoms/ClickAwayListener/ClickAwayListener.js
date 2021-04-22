import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';

const ownerDocument = (node) => (node && node.ownerDocument) || document;

class ClickAwayListener extends PureComponent {
  mounted = false;

  moved = false;

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  setWrapperRef = (node) => {
    this.node = (node && node.node && node.node.current) || null;
  }

  handleClickAway = (event) => {
    if (event.defaultPrevented) {
      return;
    }

    if (!this.mounted) {
      return;
    }

    if (this.moved) {
      this.moved = false;
      return;
    }

    if (!this.node) {
      return;
    }

    const doc = ownerDocument(this.node);

    if (
      doc.documentElement
      && doc.documentElement.contains(event.target)
      && !this.node.contains(event.target)
    ) {
      this.props.onClickAway(event);
    }
  };

  handleTouchMove = () => {
    this.moved = true;
  };

  render() {
    const { children } = this.props;
    const childElement = React.Children.only(children);

    return (
      <Fragment>
        {
          React.cloneElement(
            childElement,
            { ref: this.setWrapperRef },
          )
        }
        <EventListener
          target="document"
          mouseEvent={this.handleClickAway}
          onTouchMove={this.handleTouchMove}
          onClick={this.handleClickAway}
        />
      </Fragment>
    );
  }
}

ClickAwayListener.propTypes = {
  children: PropTypes.element.isRequired,
  onClickAway: PropTypes.func.isRequired,
};

export default ClickAwayListener;
