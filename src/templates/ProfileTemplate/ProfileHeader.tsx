// import { useMediaQuery } from 'react-responsive';
// import { Link } from 'react-router-dom';
// import EventListener, { withOptions } from 'react-event-listener';
// import Avatar from 'atoms/Avatar';
// import Typography from '../../components/Typography';
// import Icon from '../../components/Icon';
// import SocialMediaIcons from '../../components/molecules/SocialMediaIcons';
// import BurgerDrawerModal from '../../components/BurgerDrawerModal';
// import ScrollHeaderMobile from '../../components/ScrollHeaderMobile';
// import { SOCIAL_LINKS } from 'constants/users';
import Logo from 'components/Logo';
import ArtistInfo from 'features/artistInfo/ArtistInfo';
import { UploadButtonSmallView } from 'features/artistInfo/styled';
import { TUserInfo } from 'features/user/user-types';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { MLink } from 'styled';
import { HeaderWrapper } from './styled';

interface IProfileHeader {
  artistInfo?: TUserInfo;
  url?: string;
}
// const ArtistInfo = ({ artistInfo, url }) => {
//     if (artistInfo) {
//         return (
//             <ArtistInfoHolder>
//                 <UploadButtonHolder>
//                     <MLink to={`${url}/uploader`} fontSize='16'>Upload images</MLink>
//                 </UploadButtonHolder>
//                 <div>
//                     <UserName>{ `${artistInfo.first_name} ${artistInfo.last_name}` }</UserName>
//                     <MPseudoLink fontSize='14'>Logout</MPseudoLink>
//                 </div>
//             </ArtistInfoHolder>
//         );
//     }

//     return null;
// }

const ProfileHeader: React.FC<IProfileHeader> = () => {
  let { url } = useRouteMatch();

  // const [isScrollUp, setScroll] = useState(false);

  // const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });

  // const userName = `${publicInfo.first_name} ${publicInfo.last_name}`;
  return (
    <>
      <HeaderWrapper>
        <Logo />
        <ArtistInfo url={url} />
      </HeaderWrapper>
      <UploadButtonSmallView>
        <MLink to={`/uploader`} fontSize="20">
          Upload Artworks
        </MLink>
      </UploadButtonSmallView>
    </>
  );
};

export const EmptyHeader: React.FC<IProfileHeader> = () => (
  <HeaderWrapper>
    <Logo />
  </HeaderWrapper>
);

export default ProfileHeader;
