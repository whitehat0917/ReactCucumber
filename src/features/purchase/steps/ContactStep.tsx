import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useForm from '../../core/hooks/useForm';

import { contactDataSelector } from '../selectors';
import { submitContactData } from '../purchaseSlice';

import {
    StepBody,
    StepSection,
    StepSectionTitle,
    StepSectionRow,
    StepSectionRowAdaptive,
    RowInput,
    RowCheck,
    RowSelectHolder,
    RowCountryHolder,
    StreetInput,
    AptInput,
    ContinueButton
} from "../styled";
import CountryRegionSelector from '../CountryRegionSelector';

export const CONTACT_DATA_CONSTRAINTS = {
    email: {
        presence: {
            allowEmpty: false,
            message: '^field is required'
        },
        email: {
            message: '^not a valid email'
        }
    },
    phoneNumber: {
        presence: {
            allowEmpty: false,
            message: '^field is required'
        }
    },
    firstName: {
        presence: {
            allowEmpty: false,
            message: '^field is required'
        }
    },
    lastName: {
        presence: {
            allowEmpty: false,
            message: '^field is required'
        }
    },
    streetAddr: {
        presence: {
            allowEmpty: false,
            message: '^field is required'
        }
    },
    city: {
        presence: {
            allowEmpty: false,
            message: '^field is required'
        }
    },
    country: {
        presence: {
            allowEmpty: false,
            message: '^field is required'
        }
    },
    region: {
        presence: {
            allowEmpty: false,
            message: '^field is required'
        }
    },
    postalCode: {
        presence: {
            allowEmpty: false,
            message: '^field is required'
        }
    },
};

const ContactStep = ({ isDesktop, userName, productId }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { contactData } = useSelector(contactDataSelector);

    const {
        formState,
        errors,
        handleChange,
        handleSimpleCheckbox,
        handleSimpleValue,
        processForm
    } = useForm(contactData, CONTACT_DATA_CONSTRAINTS);

    const handleFormProcess = (formState, validation) => {
        if (!validation || validation.length === 0) {
            dispatch(submitContactData(formState));

            history.push(`/${userName}/shop/purchase/${productId}/shipping`);
        }
    }

    return (
        <StepBody>
            <StepSection>
                <StepSectionTitle>Contact Details</StepSectionTitle>
                <StepSectionRowAdaptive isDesktop={isDesktop}>
                    <RowInput
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        onBlur={handleChange}
                        placeholder="Email"
                        type="text"
                        validation={errors}
                    />
                    <RowInput
                        name="phoneNumber"
                        value={formState.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleChange}
                        placeholder="Phone Number"
                        type="text"
                        validation={errors}
                    />
                </StepSectionRowAdaptive>
            </StepSection>
            <StepSection>
                <StepSectionTitle>Shipping Address</StepSectionTitle>
                <StepSectionRow>
                    <RowInput
                        name="firstName"
                        value={formState.firstName}
                        onChange={handleChange}
                        onBlur={handleChange}
                        placeholder="First name"
                        type="text"
                        validation={errors}
                    />
                    <RowInput
                        name="lastName"
                        value={formState.lastName}
                        onChange={handleChange}
                        onBlur={handleChange}
                        placeholder="Last name"
                        type="text"
                        validation={errors}
                    />
                </StepSectionRow>
                <StepSectionRowAdaptive isDesktop={isDesktop}>
                    <StreetInput
                        name="streetAddr"
                        value={formState.streetAddr}
                        onChange={handleChange}
                        onBlur={handleChange}
                        placeholder="Street address"
                        type="text"
                        validation={errors}
                    />
                    <AptInput
                        name="aptNum"
                        value={formState.aptNum}
                        onChange={handleChange}
                        onBlur={handleChange}
                        placeholder="Apt, suite, etc."
                        type="text"
                        validation={errors}
                    />
                </StepSectionRowAdaptive>
                <RowInput
                    name="city"
                    value={formState.city}
                    onChange={handleChange}
                    onBlur={handleChange}
                    placeholder="City"
                    type="text"
                    validation={errors}
                />
                <StepSectionRowAdaptive isDesktop={isDesktop}>
                    <RowCountryHolder isDesktop={isDesktop}>
                        <CountryRegionSelector
                            isDesktop={isDesktop}
                            country={formState.country}
                            region={formState.region}
                            onCountryChange={handleSimpleValue('country')}
                            onRegionChange={handleSimpleValue('region')}
                        />
                    </RowCountryHolder>
                    <RowSelectHolder>
                        <RowInput
                            name="postalCode"
                            value={formState.postalCode}
                            onChange={handleChange}
                            onBlur={handleChange}
                            placeholder="Postal code"
                            type="text"
                            validation={errors}
                        />
                    </RowSelectHolder>
                </StepSectionRowAdaptive>
            </StepSection>
            <ContinueButton
                isDesktop={isDesktop}
                onClick={e => processForm(e, handleFormProcess)}
            >
                Continue to Shipping
            </ContinueButton>
        </StepBody>
    );
};

export default ContactStep;
