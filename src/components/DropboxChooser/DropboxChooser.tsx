import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import loadScript from 'load-script';
import Button from 'components/Button';
import Icon from 'components/Icon';

const ButtonTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DROPBOX_SDK_URL = 'https://www.dropbox.com/static/api/2/dropins.js';

class DropboxChooser extends React.PureComponent {
  state = {
    isScriptLoading: false,
  }

  componentDidMount() {
    if (!this.isDropboxReady()) {
      this.setState({ isScriptLoading: true });
      loadScript(DROPBOX_SDK_URL, {
        attrs: {
          id: 'dropboxjs',
          'data-app-key': this.props.appKey,
        },
      }, () => {
        this.setState({ isScriptLoading: false });
      });
    }
  }

  isDropboxReady = () => !!window.Dropbox

  handleClick = () => {
    if (this.isDropboxReady()) {
      const {
        onSuccess,
        onCancel,
        linkType,
        multiselect,
        extensions,
        uploadVia
      } = this.props;

      uploadVia('dropbox');

      window.Dropbox.choose({
        success: onSuccess,
        cancel: onCancel,
        linkType,
        multiselect,
        extensions,
      });
    }
  }

  render() {
    const { isScriptLoading } = this.state;
    const { style } = this.props;
    return (
      <Button size="normal" styleType="gray" onClick={this.handleClick} disabled={isScriptLoading} style={style}>
        <ButtonTextWrapper>
          <Icon clickable size={1.25} style={{ marginRight: '0.25rem' }}>dropbox</Icon>
          Dropbox
        </ButtonTextWrapper>
      </Button>
    );
  }
}

DropboxChooser.propTypes = {
  appKey: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  linkType: PropTypes.oneOf(['preview', 'direct']),
  onCancel: PropTypes.func,
  multiselect: PropTypes.bool,
  extensions: PropTypes.arrayOf(PropTypes.string),
  style: PropTypes.object,
};

DropboxChooser.defaultProps = {
  style: {},
  linkType: 'direct',
  multiselect: true,
  extensions: ['.jpg', '.png', '.tiff', '.tif'],
};

export default DropboxChooser;
