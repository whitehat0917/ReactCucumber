import React from 'react';
import Typography from 'components/Typography';
import Icon from 'components/Icon';
import {
  LinkHolder,
  LinkTextWrapper
} from './styled';

const shortenLink = (link) => {
    const linkUrl = new URL(link);
    return linkUrl.hostname;
};

interface ILink {
  title: string
  link: string
}

const FeaturedLink: React.FC<ILink> = ({ title, link }) => (
  <LinkHolder href={link} target="_blank" rel="noopener noreferrer">
    <LinkTextWrapper>
      <Typography style={{ fontSize: '20px' }} type="small" color="#919191">
        { shortenLink(link) }
      </Typography>
      <Typography style={{ marginTop: '0.25rem', fontSize: '20px' }} type="body3">
        {title}
      </Typography>
    </LinkTextWrapper>
    <Icon
      clickable
      style={{
        marginLeft: '0.4rem',
        marginRight: '0.3rem',
      }}
      color="#919191"
      size={0.96}
    >
      artwork_nav_arrow_right
    </Icon>
  </LinkHolder>
);

export default FeaturedLink;
