import styled, { keyframes } from 'styled-components';
import ReactDropzone from 'react-dropzone';

import Modal from 'containers/Modal';
import DefaultSeparator from 'components/FormSeparator';
import Typography from 'components/Typography';

export const StyledUploadModal = styled(Modal)`
    .Overlay {
        z-index: 9998;
    }
`;

type SeparatorProps = {
    text?: string
    className?: string
};

export const Separator = styled(DefaultSeparator)<SeparatorProps>`
    margin: 0.5rem 0;
    width: 100%;
`;

export const ButtonsContainer = styled.div`
    display: flex;
`;

// DropZone
export const StyledDrozone = styled(ReactDropzone)`
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

export const UploadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const DnDWrapper = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const DnDText = styled.div`
  text-align: center;
  width: 24rem;
`;

export const SupportText = styled.div`
  flex: 0 0 auto;
  margin-bottom: 2.25rem;
  text-align: center;
`;

export const PreviewImage = styled.img`
  width: 11.25rem;
  display: block;
`;

export const PreviewContainer = styled.div`
  height: 100%;
  box-sizing: border-box;
  padding: 1rem;
`;

export const ImageContainer = styled.div`
  margin: 0.625rem;
  width: 11.25rem;
`;

export const CheckmarkAnimation = keyframes`
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

export const csvImageIcon = 'data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJmaWxlLWNzdiIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWZpbGUtY3N2IGZhLXctMTIiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzg0IDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjI0IDEzNlYwSDI0QzEwLjcgMCAwIDEwLjcgMCAyNHY0NjRjMCAxMy4zIDEwLjcgMjQgMjQgMjRoMzM2YzEzLjMgMCAyNC0xMC43IDI0LTI0VjE2MEgyNDhjLTEzLjIgMC0yNC0xMC44LTI0LTI0em0tOTYgMTQ0YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy04Ljg0IDAtMTYgNy4xNi0xNiAxNnYzMmMwIDguODQgNy4xNiAxNiAxNiAxNmg4YzQuNDIgMCA4IDMuNTggOCA4djE2YzAgNC40Mi0zLjU4IDgtOCA4aC04Yy0yNi41MSAwLTQ4LTIxLjQ5LTQ4LTQ4di0zMmMwLTI2LjUxIDIxLjQ5LTQ4IDQ4LTQ4aDhjNC40MiAwIDggMy41OCA4IDh2MTZ6bTQ0LjI3IDEwNEgxNjBjLTQuNDIgMC04LTMuNTgtOC04di0xNmMwLTQuNDIgMy41OC04IDgtOGgxMi4yN2M1Ljk1IDAgMTAuNDEtMy41IDEwLjQxLTYuNjIgMC0xLjMtLjc1LTIuNjYtMi4xMi0zLjg0bC0yMS44OS0xOC43N2MtOC40Ny03LjIyLTEzLjMzLTE3LjQ4LTEzLjMzLTI4LjE0IDAtMjEuMyAxOS4wMi0zOC42MiA0Mi40MS0zOC42MkgyMDBjNC40MiAwIDggMy41OCA4IDh2MTZjMCA0LjQyLTMuNTggOC04IDhoLTEyLjI3Yy01Ljk1IDAtMTAuNDEgMy41LTEwLjQxIDYuNjIgMCAxLjMuNzUgMi42NiAyLjEyIDMuODRsMjEuODkgMTguNzdjOC40NyA3LjIyIDEzLjMzIDE3LjQ4IDEzLjMzIDI4LjE0LjAxIDIxLjI5LTE5IDM4LjYyLTQyLjM5IDM4LjYyek0yNTYgMjY0djIwLjhjMCAyMC4yNyA1LjcgNDAuMTcgMTYgNTYuODggMTAuMy0xNi43IDE2LTM2LjYxIDE2LTU2Ljg4VjI2NGMwLTQuNDIgMy41OC04IDgtOGgxNmM0LjQyIDAgOCAzLjU4IDggOHYyMC44YzAgMzUuNDgtMTIuODggNjguODktMzYuMjggOTQuMDktMy4wMiAzLjI1LTcuMjcgNS4xMS0xMS43MiA1LjExcy04LjctMS44Ni0xMS43Mi01LjExYy0yMy40LTI1LjItMzYuMjgtNTguNjEtMzYuMjgtOTQuMDlWMjY0YzAtNC40MiAzLjU4LTggOC04aDE2YzQuNDIgMCA4IDMuNTggOCA4em0xMjEtMTU5TDI3OS4xIDdjLTQuNS00LjUtMTAuNi03LTE3LTdIMjU2djEyOGgxMjh2LTYuMWMwLTYuMy0yLjUtMTIuNC03LTE2Ljl6Ij48L3BhdGg+PC9zdmc+';

export const SuccessIndicator = styled.div`
  visibility: ${({ status }) => (status.isSuccess ? 'visible' : 'hidden')};
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
    display: ${({ status }) => (status.isSuccess ? 'block' : 'none')};
    content: "";
    width: 7px;
    height: 14px;
    border-right: 3px solid #00A878;
    border-top: 3px solid #00A878;
    animation: ${CheckmarkAnimation} 700ms ease;
    transform-origin: left top;
    transform: scaleX(-1) rotate(135deg);
  }
`;

export const backgroundChooser = ({ status }) => {
  if (status.isLoading) return 'white';
  if (status.isSuccess) return 'rgba(33, 150, 83, 0.81)';
  if (status.isError) return '#F32404';
  return 'none';
};

export const ImageWrapper = styled.div`
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

export const ImageNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ImageName = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ErredBarWrapper = styled.div`
  margin-bottom: 0.5rem;
`;
