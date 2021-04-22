import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copyToClipboard from 'copy-to-clipboard';
import Button from 'atoms/Button';

const getSharingText = (name) => encodeURIComponent(name ? `${name}'s Online Gallery` : 'My Online Gallery');

const getSharingTextWithURL = (url, name) => encodeURIComponent(name ? `${name}'s Online Gallery - ${url}` : `My Online Gallery - ${url}`);

const getTwitterLink = (url, name) => `https://twitter.com/intent/tweet?text=${getSharingText(name)}&url=${url}`;

const getFacebookLink = (url) => `https://www.facebook.com/sharer/sharer.php?u=${url}`;

const getEmailLink = (url, name) => `mailto:?to=&subject=${getSharingText(name)}&body=${getSharingTextWithURL(url, name)}`;

class ShareButton extends Component {
  handleShareButtonClick = (type) => () => {
    const { onClick } = this.props;
    if (onClick) onClick(type);
    if (type === 'copy') {
      const { url } = this.props;
      copyToClipboard(url);
    }
  }

  handleNativeShareClick = () => {
    const { url, name } = this.props;
    window.navigator.share({
      title: name,
      text: name,
      url,
    }).then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  }

  render() {
    const {
      width, url, name, ...rest
    } = this.props;

    let options = [
      {
        label: 'Facebook',
        url: getFacebookLink(url),
        onClick: this.handleShareButtonClick('facebook'),
      },
      // { label: 'Instagram' },
      {
        label: 'Twitter',
        url: getTwitterLink(url, name),
        onClick: this.handleShareButtonClick('twitter'),
      },
      {
        label: 'Email',
        url: getEmailLink(url, name),
        onClick: this.handleShareButtonClick('email'),
      },
      {
        label: 'Copy link',
        onClick: this.handleShareButtonClick('copy'),
      },
    ];

    if (window.navigator.share) {
      options = [
        ...options,
        {
          label: 'More',
          onClick: this.handleNativeShareClick,
        },
      ];
    }

    return (
      <Button
        dropdown={{
          options,
          width: width || 9,
        }}
        fullWidth
        {...rest}
      >
        Share
      </Button>
    );
  }
}

ShareButton.propTypes = {
  width: PropTypes.number,
  name: PropTypes.string,
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ShareButton;
