//import useForm from 'features/core/hooks/useForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMachine } from '@xstate/react';
import { contactArtistMachine } from 'model/machines/contact.machine';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Action } from 'redux';
import * as yup from 'yup';
import { artworkDataMachine } from '../../../model/machines/artwork.data.machine';
import { CommonStateActions, CommonStateNames } from '../../../model/machines/common.state.machines';
import PageTemplate from '../../../templates/PageTemplate';
import { useArtistData } from '../../core/context/artistInfo.context';
import useArtistSocialLinks from '../hooks/useArtistSocialLinks';
import { TSocialLink } from '../user-types';
import ArtistContact from './ArtistContact';

interface IRenderHome {
  formState: {
    [k: string]: string;
  };
  handleChange: (e) => void;
  submitForm: (action: Action) => void;
  socialLinks: TSocialLink[];
  isLoading: boolean;
}

const RenderHome: React.FC<IRenderHome> = ({
  isLoading,
  control,
  errors,
  formState,
  handleChange,
  socialLinks,
  submitForm,
  artworkState,
}) => {
  if (!isLoading) {
    return (
      <ArtistContact
        //formState={formState}
        control={control}
        handleChange={handleChange}
        errors={errors}
        socialLinks={socialLinks}
        submitForm={submitForm}
        artworkState={artworkState}
      />
    );
  }

  return null;
};

const ContactSchema = yup.object().shape({
  from_name: yup.string().defined().required('Name is required'),
  from_email: yup.string().defined().required('Mail is required').email('Not a valid email'),
  body_text: yup.string().defined().required('Message is required'),
  artwork_id: yup.string(),
});
type ContactFormData = {
  from_name: string;
  from_email: string;
  body_text: string;
  artwork_id?: string;
};

const ArtistHomePage = () => {
  const { params } = useRouteMatch<{ artworkId?: string; userName?: string }>();
  const { artworkId, userName } = params;
  const [artistInfoState, sendArtistInfoMachine] = useArtistData();
  const [artworkState, sendArtworkMachine] = useMachine(artworkDataMachine);
  React.useEffect(() => {
    if (artworkId) {
      sendArtworkMachine(CommonStateActions.LoadData, { data: { id: artworkId } });
    }
  }, [artworkId]);

  //const { status, publicInfo } = useSelector(userSelector(STATUS_PUBLIC_INFO));
  const { formState, errors, control, handleSubmit, setValue } = useForm<ContactFormData>({
    resolver: yupResolver(ContactSchema),
    mode: 'onBlur',
    defaultValues: {
      body_text: '',
      from_email: '',
      from_name: '',
      artwork_id: artworkId,
    },
  });
  //console.log(artworkId, formState);
  /*
  React.useEffect(() => {
    if (artworkState.value === CommonStateNames.Loaded) {
      setValue(
        'body_text',
        `Hi!
I'm really interested in your work, and especially this artwork:
[${artworkState.context.artwork.title}], [${artworkState.context.id}]

It would be great to connect so I can get more details about it.
Best,`,
      );
    }
  }, [artworkState.value]);*/
  const [contactState, sendContactArtist] = useMachine(contactArtistMachine);
  const publicInfo = artistInfoState.context.artistData;
  const socialLinks = useArtistSocialLinks(publicInfo?.social_links || []);
  const history = useHistory();
  useEffect(() => {
    if (contactState.matches(CommonStateNames.Loaded)) {
      history.goBack();
    }
  }, [contactState.value]);
  return (
    <PageTemplate publicInfo={publicInfo}>
      <RenderHome
        control={control}
        errors={errors}
        //formState={formState}
        //handleChange={handleChange}
        submitForm={handleSubmit((data) => {
          sendContactArtist(CommonStateActions.SendData, {
            data: { userName, contactForm: { ...data, artwork_id: artworkId } },
          });
          //contactArtistRequest(userName, { ...data, artwork_id: artworkId });
        })}
        socialLinks={socialLinks}
        isLoading={status.isLoading}
        artworkState={artworkState}
      />
    </PageTemplate>
  );
};

export default (props: any) => (
  <React.Suspense fallback={<div>Loading parent</div>}>
    <ArtistHomePage {...props} />
  </React.Suspense>
);
