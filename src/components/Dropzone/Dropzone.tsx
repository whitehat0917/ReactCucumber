import loadImage from 'blueimp-load-image';
import Button from 'components/Button';
import Icon from 'components/Icon';
// import CsvUploadList from 'containers/CsvUploadList';
import MinorLoader from 'components/MinorLoader';
import Typography from 'components/Typography';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ReactDropzone from 'react-dropzone';
import Masonry from 'react-masonry-component';
import styled, { keyframes } from 'styled-components';
import UTIF from 'utif';
import { getImageDimensions } from 'utils/artworks';
import { v4 } from 'uuid';
import { localizable } from '../../features/core/i18n/Localizable';

const StyledDrozone = styled(ReactDropzone)`
  background: rgba(239, 241, 242, 0.4);
  border: 2px dashed rgba(156, 154, 154, 0.2);
  box-sizing: border-box;
  border-radius: 0.375rem;
  height: 100%;
  overflow-y: auto;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &.active {
    background-color: rgba(249, 110, 48, 0.05);
  }

  &:hover {
    background: ${({ disabled }) => (disabled ? 'inherit' : 'rgba(239, 241, 242, 0.6)')};
  }
`;

const UploadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const DnDWrapper = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DnDText = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
`;

const SupportText = styled.div`
  flex: 0 0 auto;
  margin-bottom: 2.25rem;
  text-align: center;
`;

const PreviewImage = styled.img`
  width: 11.25rem;
  display: block;
`;

const PreviewContainer = styled.div`
  height: 100%;
  box-sizing: border-box;
  padding: 1rem;
`;

const ImageContainer = styled.div`
  margin: 0.625rem;
  width: 11.25rem;
`;

const CheckmarkAnimation = keyframes`
  0% {
    height: 0;
    width: 0;
  }
  20% {
    height: 0;
    width: 7px;
  }
  40% {
    height: 14px;
    width: 7px;
  }
  100% {
    height: 14px;
    width: 7px;
  }
`;

const csvImageIcon =
  'data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJmaWxlLWNzdiIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWZpbGUtY3N2IGZhLXctMTIiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzg0IDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjI0IDEzNlYwSDI0QzEwLjcgMCAwIDEwLjcgMCAyNHY0NjRjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMzM2YzEzLjMgMCAyNC0xMC43IDI0LTI0VjE2MEgyNDhjLTEzLjIgMC0yNC0xMC44LTI0LTI0em0tOTYgMTQ0YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy04Ljg0IDAtMTYgNy4xNi0xNiAxNnYzMmMwIDguODQgNy4xNiAxNiAxNiAxNmg4YzQuNDIgMCA4IDMuNTggOCA4djE2YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy0yNi41MSAwLTQ4LTIxLjQ5LTQ4LTQ4di0zMmMwLTI2LjUxIDIxLjQ5LTQ4IDQ4LTQ4aDhjNC40MiAwIDggMy41OCA4IDh2MTZ6bTQ0LjI3IDEwNEgxNjBjLTQuNDIgMC04LTMuNTgtOC04di0xNmMwLTQuNDIgMy41OC04IDgtOGgxMi4yN2M1Ljk1IDAgMTAuNDEtMy41IDEwLjQxLTYuNjIgMC0xLjMtLjc1LTIuNjYtMi4xMi0zLjg0bC0yMS44OS0xOC43N2MtOC40Ny03LjIyLTEzLjMzLTE3LjQ4LTEzLjMzLTI4LjE0IDAtMjEuMyAxOS4wMi0zOC42MiA0Mi40MS0zOC42MkgyMDBjNC40MiAwIDggMy41OCA4IDh2MTZjMCA0LjQyLTMuNTggOC04IDhoLTEyLjI3Yy01Ljk1IDAtMTAuNDEgMy41LTEwLjQxIDYuNjIgMCAxLjMuNzUgMi42NiAyLjEyIDMuODRsMjEuODkgMTguNzdjOC40NyA3LjIyIDEzLjMzIDE3LjQ4IDEzLjMzIDI4LjE0LjAxIDIxLjI5LTE5IDM4LjYyLTQyLjM5IDM4LjYyek0yNTYgMjY0djIwLjhjMCAyMC4yNyA1LjcgNDAuMTcgMTYgNTYuODggMTAuMy0xNi43IDE2LTM2LjYxIDE2LTU2Ljg4VjI2NGMwLTQuNDIgMy41OC04IDgtOGgxNmM0LjQyIDAgOCAzLjU4IDggOHYyMC44YzAgMzUuNDgtMTIuODggNjguODktMzYuMjggOTQuMDktMy4wMiAzLjI1LTcuMjcgNS4xMS0xMS43MiA1LjExcy04LjctMS44Ni0xMS43Mi01LjExYy0yMy40LTI1LjItMzYuMjgtNTguNjEtMzYuMjgtOTQuMDlWMjY0YzAtNC40MiAzLjU4LTggOC04aDE2YzQuNDIgMCA4IDMuNTggOCA4em0xMjEtMTU5TDI3OS4xIDdjLTQuNS00LjUtMTAuNi03LTE3LTdIMjU2djEyOGgxMjh2LTYuMWMwLTYuMy0yLjUtMTIuNC03LTE2Ljl6Ij48L3BhdGg+PC9zdmc+';

const SuccessIndicator = styled.div`
  visibility: visible;
  position: absolute;
  z-index: 1;
  width: 2rem;
  height: 2rem;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 50%;
  background-color: white;
  :after {
    position: absolute;
    top: 1rem;
    left: 0.4rem;
    display: block;
    content: '';
    width: 7px;
    height: 14px;
    border-right: 3px solid #00a878;
    border-top: 3px solid #00a878;
    animation: ${CheckmarkAnimation} 700ms ease;
    transform-origin: left top;
    transform: scaleX(-1) rotate(135deg);
  }
`;

const backgroundChooser = ({ status }) => {
  // if (status.isLoading) return 'white';
  // if (status.isSuccess) return 'rgba(33, 150, 83, 0.81)';
  // if (status.isError) return '#F32404';
  return 'none';
};

const ImageWrapper = styled.div`
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${backgroundChooser};
    transition: background-color 70ms linear;
    opacity: 0.5;
  }
`;

const ImageNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ImageName = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ErredBarWrapper = styled.div`
  margin-bottom: 0.5rem;
`;

const DownloadErredCsvBar = ({ onClick }) => (
  <ErredBarWrapper>
    <Button onClick={onClick} width={16}>
      Download erred rows
    </Button>
  </ErredBarWrapper>
);
DownloadErredCsvBar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const mapFileToSerializable = (file: any) => {
  return file;
  console.log(
    file,
    Object.assign({}, file, {
      lastModifiedDate:
        file.lastModifiedDate && typeof file.lastModifiedDate === 'object'
          ? (file.lastModifiedDate as Date).toISOString()
          : '',
    }),
  );
  return {
    name: file.name,
    size: file.size,
    lastModified: file.lastModified,
    type: file.type,
    lastModifiedDate:
      file.lastModifiedDate && typeof file.lastModifiedDate === 'object'
        ? (file.lastModifiedDate as Date).toISOString()
        : '',
  };
};
class Dropzone extends Component {
  state = {
    loading: false,
  };

  handleRemoveFileClick = (id) => (e) => {
    const { onRemoveFileClick } = this.props;

    e.stopPropagation();
    onRemoveFileClick(id);
  };

  handleDrop = (newFiles) => {
    const { onDrop, createNotification } = this.props;
    this.setState({ loading: true });

    if (newFiles.length && (newFiles[0].type === 'text/csv' || newFiles[0].type === 'application/vnd.ms-excel')) {
      this.setState({ loading: false });
      onDrop([
        {
          file: mapFileToSerializable(newFiles[0]),
          type: 'csv',
        },
      ]);
      return;
    }

    const promises = newFiles.map(
      (file) =>
        new Promise((resolve, reject) => {
          loadImage(
            file,
            (canvas) => {
              if (file.type === 'image/tiff' && FileReader) {
                const fr = new FileReader();
                fr.onload = (e) => {
                  try {
                    let ifds = UTIF.decode(e.target.result);
                    UTIF.decodeImage(e.target.result, ifds[0]);

                    const imgWidth = ifds[0].width;
                    const imgHeight = ifds[0].height;

                    const rgba = new Uint8ClampedArray(UTIF.toRGBA8(ifds[0]));
                    const imgData = new ImageData(rgba, imgWidth, imgHeight);

                    const canvas = document.createElement('canvas');
                    canvas.width = imgWidth;
                    canvas.height = imgHeight;
                    canvas.getContext('2d').putImageData(imgData, 0, 0);

                    const imgDataUrl = canvas.toDataURL(file.type);

                    resolve({
                      dataUrl: imgDataUrl,
                      type: file.type,
                      image_original_width: imgWidth,
                      image_original_height: imgHeight,
                    });
                  } catch (err) {
                    reject(new Error(`Sorry. File ${file.name} is invalid or unsupported`));
                  }
                };
                fr.readAsArrayBuffer(file);
              } else if (canvas.toDataURL) {
                getImageDimensions(file).then((dimensions) => {
                  resolve({
                    dataUrl: canvas.toDataURL(file.type),
                    type: file.type,
                    image_original_width: dimensions.width,
                    image_original_height: dimensions.height,
                  });
                });
              } else {
                reject(new Error(`Sorry. File ${file.name} is invalid or unsupported`));
              }
            },
            { maxWidth: 180, orientation: true, canvas: true },
          );
        }),
    );

    Promise.all(promises)
      .then((data) => {
        this.setState({ loading: false });
        onDrop(
          newFiles.map((file, idx) => ({
            file: mapFileToSerializable(file),
            dataUrl: data[idx].dataUrl,
            type: data[idx].type,
            image_original_width: data[idx].image_original_width,
            image_original_height: data[idx].image_original_height,
          })),
        );
      })
      .catch((err) => {
        createNotification({
          type: 'commonError',
          timeout: 5000,
          text: err.message,
        });
        this.setState({ loading: false });
      });
  };

  renderUploadingView = (getRootProps: () => any) => (
    <UploadingContainer {...getRootProps()}>
      <DnDWrapper>
        <Icon size="big" style={{ merginBottom: '1.5rem' }}>
          cloud
        </Icon>
        <DnDText>
          <Typography type="body3" style={{ display: 'inline', margin: '0 4px 0 0' }}>
            Drag and drop images here or
          </Typography>
          <Typography type="body3" weight="bold" style={{ display: 'inline' }}>
            {'choose images'}
          </Typography>
        </DnDText>
      </DnDWrapper>
      <SupportText>
        <Typography type="caption" color="muted">
          {this.props._('supported.files')}
        </Typography>
        <Typography type="caption" color="muted">
          {this.props._('supported.file.extension')}
        </Typography>
      </SupportText>
    </UploadingContainer>
  );

  renderPicturesView = (getRootProps: () => any) => {
    const { files } = this.props;

    // console.log('renderPicturesView files -> ', files);

    return (
      <PreviewContainer {...getRootProps()}>
        <Masonry>
          {files.map(({ file, id, status, dataUrl, thumbnail, name }) => (
            <ImageContainer key={v4()}>
              <ImageWrapper status={status}>
                <PreviewImage referrerPolicy="no-referrer" alt={name} src={dataUrl || thumbnail} />
                <SuccessIndicator status={status} />
              </ImageWrapper>
              <ImageNameWrapper>
                <ImageName
                  // color={status.isError ? 'error' : 'default'}
                  color="default"
                  type="caption"
                >
                  {name}
                </ImageName>
                <Icon color="muted" size={0.375} clickable onClick={this.handleRemoveFileClick(id)}>
                  close
                </Icon>
              </ImageNameWrapper>
            </ImageContainer>
          ))}
        </Masonry>
      </PreviewContainer>
    );
  };

  render() {
    const { onCancel, files, disabled, csvData, exportErredCsvRows, isLoading } = this.props;
    const { loading } = this.state;
    // const csvErred = csvData.filter((row) => row.uploadStatus === 'error');
    return (
      <Fragment>
        {/* {Boolean(csvErred.length) && !isLoading && <DownloadErredCsvBar onClick={exportErredCsvRows} /> } */}
        <StyledDrozone
          disableClick={disabled}
          disabled={disabled}
          accept="image/jpeg,image/jpg,image/png,image/tiff,text/comma-separated-values,text/csv,application/csv,application/vnd.ms-excel,.csv"
          onDrop={this.handleDrop}
          onFileDialogCancel={onCancel}
          multiple
          activeClassName="active"
        >
          {({ getRootProps, getInputProps }) => {
            if (loading) return <MinorLoader />;
            if (!loading && files.length === 0)
              return (
                <>
                  {this.renderUploadingView(getRootProps)} <input {...getInputProps()} />
                </>
              );
            if (!loading && files.length > 0 && files[0].type !== 'csv')
              return (
                <>
                  {this.renderPicturesView(getRootProps)}
                  <input {...getInputProps()} />
                </>
              );
            return null;
          }}
        </StyledDrozone>
      </Fragment>
    );
  }
}

Dropzone.defaultProps = {
  files: [],
};

Dropzone.propTypes = {
  // files: PropTypes.array,
  // onDrop: PropTypes.func.isRequired,
  // onCancel: PropTypes.func,
  // onRemoveFileClick: PropTypes.func.isRequired,
  // disabled: PropTypes.bool,
  // csvData: PropTypes.array.isRequired,
  // exportErredCsvRows: PropTypes.func.isRequired,
  // createNotification: PropTypes.func.isRequired,
  // isLoading: PropTypes.bool.isRequired,
};

export default localizable(Dropzone, 'upload.dialog');
