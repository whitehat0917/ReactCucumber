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

const GOOGLE_SDK_URL = 'https://apis.google.com/js/api.js';

let scriptLoadingStarted = false;

class GoogleChooser extends React.PureComponent {
  componentDidMount() {
    if (this.isGoogleReady()) {
      this.onApiLoad();
    } else if (!scriptLoadingStarted) {
      scriptLoadingStarted = true;
      loadScript(GOOGLE_SDK_URL, this.onApiLoad);
    }
  }

  isGoogleReady = () => !!window.gapi

  isGoogleAuthReady = () => !!window.gapi.auth

  isGooglePickerReady = () => !!window.google.picker

  onApiLoad = () => {
    window.gapi.load('auth:client:picker', {
      callback: this.handleGapiLibsLoad,
    });
  }

  handleGapiLibsLoad = () => {
    window.gapi.client.load('drive', 'v2');
  }

  doAuth = (callback) => {
    window.gapi.auth.authorize({
      client_id: this.props.clientId,
      scope: this.props.scope,
      immediate: this.props.authImmediate,
    },
    callback);
  }

  onChoose = () => {
    const { uploadVia } = this.props;

    if (!this.isGoogleReady() || !this.isGoogleAuthReady() || !this.isGooglePickerReady() || this.props.disabled) {
      return null;
    }

    uploadVia('gdrive');

    const token = window.gapi.auth.getToken();
    const oauthToken = token && token.access_token;
    // TODO check if freshness is an issue
    if (oauthToken) {
      this.createPicker(oauthToken);
    } else {
      this.doAuth((response) => {
        if (response.access_token) {
          this.createPicker(response.access_token);
        } else {
          this.props.onAuthFailed(response);
        }
      });
    }
    return undefined;
  }

  getFileInfo = (fileId) => new Promise((resolve) => {
    window.gapi.client.drive.files.get({ fileId }).execute(resolve);
  })

  handlePickerChange = (e) => {
    const { uploadVia, onChange } = this.props;
    onChange(e);
    
    if (e.action === 'picked') {
      const images = e.docs;
      const promises = images.map((image) => this.getFileInfo(image.id));
      Promise.all(promises).then((data) => {
        const { access_token: accessToken } = window.gapi.auth.getToken();
        const fileObjects = data.map((item) => {
          let dimensions = {};
          const { imageMediaMetadata } = item;
          if (imageMediaMetadata && imageMediaMetadata.width) {
            dimensions = {
              image_original_width: imageMediaMetadata.width,
              image_original_height: imageMediaMetadata.height,
            };
          }
          return {
            type: item.mimeType,
            thumbnail: item.thumbnailLink,
            source: 'gdrive',
            file: {
              url: `${item.downloadUrl}&access_token=${accessToken}`,
              name: item.originalFilename,
            },
            ...dimensions,
          };
        });

        this.props.onSuccess(fileObjects);
      });
    }
  }

  createPicker = (oauthToken) => {
    this.props.onAuthenticate(oauthToken);

    if (this.props.createPicker) {
      return this.props.createPicker(window.google, oauthToken);
    }

    const googleViewId = window.google.picker.ViewId[this.props.viewId];
    const view = new window.google.picker.View(googleViewId);

    if (this.props.mimeTypes) {
      view.setMimeTypes(this.props.mimeTypes.join(','));
    }
    if (this.props.query) {
      view.setQuery(this.props.query);
    }

    if (!view) {
      throw new Error('Can\'t find view by viewId');
    }

    const picker = new window.google.picker.PickerBuilder()
      .addView(view)
      .setOAuthToken(oauthToken)
      .setDeveloperKey(this.props.developerKey)
      .setCallback(this.handlePickerChange);

    if (this.props.origin) {
      picker.setOrigin(this.props.origin);
    }

    if (this.props.navHidden) {
      picker.enableFeature(window.google.picker.Feature.NAV_HIDDEN);
    }

    if (this.props.multiselect) {
      picker.enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED);
    }

    picker.build()
      .setVisible(true);
    return undefined;
  }

  render() {
    return (
      <Button size="normal" styleType="gray" onClick={this.onChoose}>
        <ButtonTextWrapper>
          <Icon clickable size={1.25} style={{ marginRight: '0.25rem' }}>gdrive</Icon>
          G Drive
        </ButtonTextWrapper>
      </Button>
    );
  }
}

GoogleChooser.propTypes = {
  clientId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  developerKey: PropTypes.string,
  scope: PropTypes.array,
  mimeTypes: PropTypes.arrayOf(PropTypes.string),
  viewId: PropTypes.string,
  authImmediate: PropTypes.bool,
  origin: PropTypes.string,
  query: PropTypes.string,
  onChange: PropTypes.func,
  onAuthenticate: PropTypes.func,
  onAuthFailed: PropTypes.func,
  createPicker: PropTypes.func,
  multiselect: PropTypes.bool,
  navHidden: PropTypes.bool,
  disabled: PropTypes.bool,
};

GoogleChooser.defaultProps = {
  onChange: () => {},
  mimeTypes: ['image/jpg', 'image/jpeg', 'image/png', 'image/tiff', 'image/tif'],
  onAuthenticate: () => {},
  onAuthFailed: () => {},
  scope: ['https://www.googleapis.com/auth/drive.readonly'],
  viewId: 'DOCS',
  authImmediate: false,
  multiselect: true,
  navHidden: false,
  disabled: false,
};

export default GoogleChooser;
