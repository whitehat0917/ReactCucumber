import { ApiContactRequest } from 'model/artist.types';
import { contactArtistRequest } from '../../services/api/artist.endpoints.service';
import { simpleSendMachine } from './common.state.machines';

export const contactArtistMachine = simpleSendMachine<{ userName; contactForm: ApiContactRequest }, any>(
  (ctx, evt) => {
    return contactArtistRequest(evt.data.userName, evt.data.contactForm);
  },
  'Your message has been sent',
  "Something was wrong. Can't send message",
);
