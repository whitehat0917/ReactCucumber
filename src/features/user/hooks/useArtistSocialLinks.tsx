import { TSocialLink } from "../user-types";

export const SOCIAL_LINKS = {
    '1': { url: 'instagram.com', label: 'Instagram' },
    '2': { url: 'facebook.com', label: 'Facebook' },
    '3': { url: 'twitter.com', label: 'Twitter' },
    '4': { url:'linkedin.com/in', label: 'LinkedIn' },
    '5': { url: 'pinterest.com', label: 'Pinterest' },
    '6': { url: 'flickr.com', label: 'Flickr' },
};

function useArtistSocialLinks (links: TSocialLink[]) {
    if (Array.isArray(links) && links.length) {
        return links.map(link => ({
            url: `https://${SOCIAL_LINKS[link.provider].url}/${link.handle}`,
            label: SOCIAL_LINKS[link.provider].label
        }));
    }
    
    return null;
}

export default useArtistSocialLinks;