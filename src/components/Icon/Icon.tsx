import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CLOUD from './cloud.svg';
import MARCEL from './marcel.svg';
import MARCEL_GRAY from './marcel-gray.svg';
import MARCEL_V2 from './marcel_v2.svg';
import MARCEL_V2_ICON from './marcel_v2_icon_only.svg';
import MARCEL_SQUARE from './marcel_square.svg';
import UID from './uid.svg';
import NOTE_ADD from './note-add.svg';
import FIREWORK from './firework.png';
import THUMB_UP from './thumb_up.png';
import SAD_FACE from './sad_face.png';
import GOOGLE from './google.svg';
import APPLE from './apple.svg';
import APPLE_DOWNLOAD from './apple_download_app.svg';
import APPLE_APP_STORE from './apple_app_store.svg';
import ZOOM from './zoom.svg';
import ARROW_LEFT from './arrow_left.svg';
import ARROW_RIGHT from './arrow_right.svg';
import DROPBOX from './dropbox.svg';
import GDRIVE from './gdrive.svg';
import FACEBOOK from './facebook.svg';
import COLLAPSE_UP from './collapse_up.svg';
import COLLAPSE_DOWN from './collapse_down.svg';
import FACEBOOK_LINK from './facebook.png';
import INSTAGRAM_LINK from './instagram.png';
import LINKEDIN_LINK from './linkedin.png';
import BURGER_MENU from './burger_menu.svg';
import TICK from './tick.svg';

const CUSTOM_ICONS = {
  marcel: MARCEL,
  marcel_gray: MARCEL_GRAY,
  marcel_v2: MARCEL_V2,
  marcel_v2_icon: MARCEL_V2_ICON,
  marcel_square: MARCEL_SQUARE,
  cloud: CLOUD,
  uid: UID,
  note_add: NOTE_ADD,
  firework: FIREWORK,
  thumb_up: THUMB_UP,
  sad_face: SAD_FACE,
  google: GOOGLE,
  apple: APPLE,
  apple_download: APPLE_DOWNLOAD,
  apple_app_store: APPLE_APP_STORE,
  zoom: ZOOM,
  arrow_left: ARROW_LEFT,
  arrow_right: ARROW_RIGHT,
  dropbox: DROPBOX,
  gdrive: GDRIVE,
  facebook: FACEBOOK,
  collapse_up: COLLAPSE_UP,
  collapse_down: COLLAPSE_DOWN,
  facebook_link: FACEBOOK_LINK,
  instagram_link: INSTAGRAM_LINK,
  linkedin_link: LINKEDIN_LINK,
  menu: BURGER_MENU,
  tick:TICK
};

const sizeChooser = ({ size }) => {
  if (typeof size === 'number') {
    return `${size}rem`;
  }

  switch (size.toLowerCase()) {
    case 'small': {
      return '1.25rem';
    }
    case 'big': {
      return '3.25rem';
    }
    case 'normal':
    default: {
      return '2rem';
    }
  }
};

const vAlignChooser = ({ inline }) => {
  if (inline) {
    return 'sub';
  }
  return 'unset';
};

const colorChooser = ({ color, theme }) => {
  if (!color) return theme.palette.gray[100];
  switch (color.toLowerCase()) {
    case 'primary': return theme.palette.primary[30];
    case 'muted': return theme.palette.gray[30];
    case 'white': return theme.palette.white;
    case 'default': return theme.palette.gray[100];
    default: {
      return color;
    }
  }
};

const IconWrapper = styled.img`
  cursor: ${({ clickable }) => (clickable ? 'pointer !important' : 'initial')};
  height: ${sizeChooser};
  object-fit: contain;
  width: ${sizeChooser};
  vertical-align: ${vAlignChooser};
`;

const IconSVG = styled.svg`
  flex: none;
  cursor: ${({ clickable }) => (clickable ? 'pointer !important' : 'initial')};
  height: ${sizeChooser};
  width: ${sizeChooser};
  fill: ${({ fill, ...props }) => (fill || colorChooser(props))};
  stroke: ${({ coloredStroke, ...props }) => (coloredStroke && colorChooser(props))};
  transform: ${({ transform }) => transform || 'none'};
`;

const Polygon = (props) => (
  <IconSVG viewBox="0 0 8 6" {...props}>
    <path d="M3.23178 0.921865C3.63157 0.44211 4.36843 0.442111 4.76822 0.921865L7.63318 4.35982C8.17595 5.01114 7.7128 6 6.86496 6H1.13504C0.287204 6 -0.175952 5.01114 0.36682 4.35982L3.23178 0.921865Z" />
  </IconSVG>
);

const Eye = (props) => (
  <IconSVG viewBox="0 0 20 12" {...props}>
    <path d="M10 0C6.17879 0 2.71351 2.10432 0.15649 5.52231C-0.0521632 5.80233 -0.0521632 6.19355 0.15649 6.47358C2.71351 9.89568 6.17879 12 10 12C13.8212 12 17.2865 9.89568 19.8435 6.47769C20.0522 6.19767 20.0522 5.80645 19.8435 5.52642C17.2865 2.10432 13.8212 0 10 0ZM10.2741 10.2251C7.73755 10.3857 5.64284 8.2814 5.80239 5.72409C5.93331 3.61565 7.63118 1.90666 9.72589 1.77488C12.2625 1.61428 14.3572 3.7186 14.1976 6.27591C14.0626 8.38023 12.3647 10.0892 10.2741 10.2251ZM10.1473 8.27316C8.78081 8.35964 7.65163 7.22718 7.74164 5.85175C7.81119 4.71517 8.72763 3.79684 9.85681 3.72272C11.2233 3.63624 12.3525 4.7687 12.2625 6.14413C12.1888 7.28483 11.2724 8.20316 10.1473 8.27316Z" />
  </IconSVG>
);

const Close = (props) => (
  <IconSVG viewBox="0 0 14 14" {...props}>
    <path d="M1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292894C0.683418 -0.0976306 1.31658 -0.0976306 1.70711 0.292894L7 5.58579L12.2929 0.292894C12.6834 -0.0976312 13.3166 -0.0976312 13.7071 0.292894C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071Z" />
  </IconSVG>
);

const Note = (props) => (
  <IconSVG viewBox="0 0 18 22" {...props} fill="none" coloredStroke>
    <path d="M4.99994 11H12.9999" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.99994 15.2861H12.9999" strokeLinecap="round" strokeLinejoin="round" />
    <path fillRule="evenodd" clipRule="evenodd" d="M15.6667 21H2.33333C1.59733 21 1 20.36 1 19.5714V2.42857C1 1.64 1.59733 1 2.33333 1H15.6667C16.404 1 17 1.64 17 2.42857V19.5714C17 20.36 16.404 21 15.6667 21Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.99994 6.71387H12.9999" strokeLinecap="round" strokeLinejoin="round" />
  </IconSVG>
);

const List = (props) => (
  <IconSVG viewBox="0 0 16 16" {...props}>
    <rect x="2" y="3" width="2" height="2" rx="1" />
    <rect x="5" y="3" width="9" height="2" rx="1" />
    <rect x="2" y="7" width="2" height="2" rx="1" />
    <rect x="5" y="7" width="9" height="2" rx="1" />
    <rect x="2" y="11" width="2" height="2" rx="1" />
    <rect x="5" y="11" width="9" height="2" rx="1" />
  </IconSVG>
);

const Grid = (props) => (
  <IconSVG viewBox="0 0 16 16" {...props}>
    <rect x="2" y="2" width="5" height="5" />
    <rect x="9" y="2" width="5" height="5" />
    <rect x="2" y="9" width="5" height="5" />
    <rect x="9" y="9" width="5" height="5" />
  </IconSVG>
);

const Filter = (props) => (
  <IconSVG viewBox="0 0 20 20" {...props}>
    <path d="M3.48292 3.3737C3.13929 3.06826 3.35534 2.5 3.8151 2.5H16.1849C16.6447 2.5 16.8607 3.06826 16.5171 3.3737L11.875 7.5H8.125L3.48292 3.3737Z" />
    <path d="M8.125 7.5H11.875V15.5292C11.875 15.9597 11.5996 16.3418 11.1912 16.4779L8.78311 17.2806C8.45935 17.3886 8.125 17.1476 8.125 16.8063V7.5Z" />
  </IconSVG>
);

const Sort = (props) => (
  <IconSVG viewBox="0 0 12 12" {...props}>
    <rect x="1.5" y="2.25" width="9" height="1.5" rx="0.75" />
    <rect x="1.5" y="5.25" width="6.75" height="1.5" rx="0.75" />
    <rect x="1.5" y="8.25" width="4.5" height="1.5" rx="0.75" />
  </IconSVG>
);

const Send = (props) => (
  <IconSVG viewBox="0 0 44 44" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M34.2222 22.0002C34.2222 22.4999 33.918 22.9494 33.4539 23.135L12.5016 31.5159C12.0754 31.6864 11.5897 31.6037 11.2439 31.3019C10.8981 31.0001 10.7506 30.53 10.8619 30.0847L12.883 22.0002L10.8619 13.9156C10.7506 13.4704 10.8981 13.0003 11.2439 12.6984C11.5897 12.3966 12.0754 12.3139 12.5016 12.4844L33.4539 20.8654C33.918 21.051 34.2222 21.5004 34.2222 22.0002ZM13.8131 15.6418L15.3286 21.7037C15.3773 21.8984 15.3773 22.102 15.3286 22.2966L13.8131 28.3586L29.7091 22.0002L13.8131 15.6418Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M14.1478 22.001C14.1478 21.326 14.695 20.7788 15.37 20.7788H31.6671C32.3421 20.7788 32.8893 21.326 32.8893 22.001C32.8893 22.676 32.3421 23.2233 31.6671 23.2233H15.37C14.695 23.2233 14.1478 22.676 14.1478 22.001Z" />
  </IconSVG>
);

const DropdownArrowDown = (props) => (
  <IconSVG viewBox="0 0 18 12" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M0.802439 0.494231C1.27975 -0.0163061 2.05361 -0.0163061 2.53092 0.494231L9.00001 7.41369L15.4691 0.494231C15.9464 -0.0163061 16.7203 -0.0163061 17.1976 0.494231C17.6749 1.00477 17.6749 1.83251 17.1976 2.34305L9.00001 11.1113L0.802439 2.34305C0.325131 1.83251 0.325131 1.00477 0.802439 0.494231Z" />
  </IconSVG>
);

const DropdownArrowUp = (props) => (
  <IconSVG viewBox="0 0 18 12" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M0.802317 10.7284C1.27962 11.239 2.05349 11.239 2.5308 10.7284L8.99989 3.80896L15.469 10.7284C15.9463 11.239 16.7202 11.239 17.1975 10.7284C17.6748 10.2179 17.6748 9.39014 17.1975 8.87961L8.99989 0.111328L0.802317 8.87961C0.325009 9.39014 0.325009 10.2179 0.802317 10.7284Z" />
  </IconSVG>
);

const ArtworkNavArrowLeft = (props) => (
  <IconSVG viewBox="0 0 12 18" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M11.506 17.1977C12.0166 16.7204 12.0166 15.9465 11.506 15.4692L4.58655 9.00011L11.506 2.53102C12.0166 2.05371 12.0166 1.27984 11.506 0.802536C10.9955 0.325227 10.1677 0.325227 9.6572 0.802536L0.888916 9.00011L9.6572 17.1977C10.1677 17.675 10.9955 17.675 11.506 17.1977Z" />
  </IconSVG>
);

const ArtworkNavArrowRight = (props) => (
  <IconSVG viewBox="0 0 12 18" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M0.493987 17.1977C-0.0165503 16.7204 -0.0165503 15.9465 0.493987 15.4692L7.41345 9.00011L0.493987 2.53102C-0.0165503 2.05371 -0.0165503 1.27984 0.493987 0.802536C1.00452 0.325227 1.83227 0.325227 2.3428 0.802536L11.1111 9.00011L2.3428 17.1977C1.83227 17.675 1.00452 17.675 0.493987 17.1977Z" />
  </IconSVG>
);

const CUSTOM_CHANGEABLE_ICONS = {
  eye: Eye,
  close: Close,
  arrow_up: Polygon,
  arrow_down: (props) => (<Polygon transform="rotate(180)" {...props} />),
  arrow_right: (props) => (<Polygon transform="rotate(90)" {...props} />),
  arrow_left: (props) => (<Polygon transform="rotate(-90)" {...props} />),
  note: Note,
  list: List,
  grid: Grid,
  filter: Filter,
  sort_desc: Sort,
  sort_asc: (props) => (<Sort transform="rotate(180)" {...props} />),
  send: Send,
  dropdown_arrow_down: DropdownArrowDown,
  dropdown_arrow_up: DropdownArrowUp,
  artwork_nav_arrow_left: ArtworkNavArrowLeft,
  artwork_nav_arrow_right: ArtworkNavArrowRight,
};

const Icon = ({ src, children, ...props }) => {
  if (src) {
    return (
      <IconWrapper
        src={src}
        {...props}
      />
    );
  }
  if (children && CUSTOM_ICONS[children.toString().toLowerCase()]) {
    const icon = CUSTOM_ICONS[children.toString().toLowerCase()];
    return <IconWrapper src={icon} {...props} />;
  }
  if (children && CUSTOM_CHANGEABLE_ICONS[children.toString().toLowerCase()]) {
    const CurrentIcon = CUSTOM_CHANGEABLE_ICONS[children.toString().toLowerCase()];
    return <CurrentIcon {...props} />;
  }
  return null;
};

Icon.defaultProps = {
  inline: 'unset',
  size: 'normal',
  color: 'default',
};

Icon.propTypes = {
  src: PropTypes.string,
  children: PropTypes.string,
  inline: PropTypes.oneOf([
    'sub',
    'unset',
  ]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([
    'small',
    'big',
    'normal',
  ])]),
  color: PropTypes.string,
  clickable: PropTypes.bool,
};

export default Icon;
