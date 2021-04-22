/* eslint-disable camelcase */
import Buttons from 'components/Buttons';
import Inputs from 'components/Inputs';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Fragment } from 'react';
import { DotLoader } from 'react-spinners';
import { State } from 'xstate';
import { ApiArtwork } from '../../../model/artwork.types';
import { CommonStateNames } from '../../../model/machines/common.state.machines';
import { caseOf } from '../../../utils/case.of';
import RenderSocialLinks, { TLink } from '../ArtistHome/RenderSocialLinks';
import { ArtistSocialLink } from '../ArtistHome/styled';
import {
  ArtistImageContainer,
  ArtistSmallImage,
  AttachArtworkContainer,
  AttachArtworkDescription,
  AttachArtworkTitle,
  ButtonWrapper,
  ContactForm,
  ContactTitle,
  InputsWrapper,
  SocialLinksHolder,
  SocialTitle,
  TitleHolder,
} from './styled';

interface IArtistContact {
  control: any;
  submitForm: any;
  formState: IFormState;
  errors: any;
  socialLinks: TLink[];
}

interface IFormState {
  from_name: string;
  from_email: string;
  body_text: string;
}

const ArtistHome: React.FC<IArtistContact> = ({
  control,
  errors,
  socialLinks,
  submitForm,
  artworkState,
}: {
  control: any;
  errors: any;
  socialLinks: any;
  submitForm: any;
  artworkState: State<{ artwork: ApiArtwork }, any>;
}) => {
  return (
    <Fragment>
      <ContactForm onSubmit={submitForm}>
        <TitleHolder>
          <ContactTitle>Contact</ContactTitle>
        </TitleHolder>
        <InputsWrapper>
          <Inputs.ControlledTextInput
            control={control}
            name="from_name"
            placeholder="Your name"
            /// onChange={handleChange}
            errors={errors}
            type="text"
          />
          <Inputs.ControlledTextInput
            control={control}
            name="from_email"
            placeholder="Your email"
            //onChange={handleChange}
            errors={errors}
            type="text"
          />
          {/* <Inputs.SelectTopics topics={["General","General1","General2","General3"]} name="General" onChange={handleChange}/> */}
          <Inputs.ControlledTextInput
            control={control}
            name="body_text"
            placeholder="Type a message"
            //onChange={handleChange}
            area
            maxLines={3}
            errors={errors}
            type="text"
          />
        </InputsWrapper>
        <AnimatePresence>
          {caseOf<typeof artworkState>()
            .case(
              (a) => a.matches(CommonStateNames.Loading),
              (a) => (
                <div>
                  <DotLoader />
                </div>
              ),
            )
            .case(
              (a) => a.matches(CommonStateNames.Loaded),
              (a) => (
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{ scaleY: 0 }}
                  style={{ transformOrigin: '50% 0' }}
                >
                  <ArtistImageContainer>
                    <ArtistSmallImage src={artworkState.context.artwork.images[0].thumbnails.small} />
                    <AttachArtworkContainer>
                      <AttachArtworkDescription>Attach artwork</AttachArtworkDescription>
                      <AttachArtworkTitle>{artworkState.context.artwork.title}</AttachArtworkTitle>
                    </AttachArtworkContainer>
                  </ArtistImageContainer>
                </motion.div>
              ),
            )
            .defaultCase(() => null)
            .eval(artworkState)}
        </AnimatePresence>
        <ButtonWrapper>
          <Buttons.MobileButtons width="100%" text="Send" />
        </ButtonWrapper>
        <SocialLinksHolder>
          <SocialTitle>Find me also here</SocialTitle>
          <RenderSocialLinks withIcon linkComponent={ArtistSocialLink} socialLinks={socialLinks} />
        </SocialLinksHolder>
      </ContactForm>
    </Fragment>
  );
};

export default ArtistHome;
