import React from 'react';
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import theme from "../../theme";

import {
    CountrySelectorBody,
    CountrySelectorItem
} from "./styled";

const BASE_STYLE = {
    backgroundColor: 'white',
    border: 'none',
    borderBottom: 'solid 2px #FF5B00',
    width: '100%',
    height: '59px',

    fontFamily: theme.fonts.light,
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: '20px',
    mozAppearance: 'none',
    webkitAppearance: 'none',
    appearance: 'none',
    "&:focus": {
        outline: "none",
    },
    outline: "none",
    mozFocusring: {
        color: "transparent",
        textShadow: "0 0 0 #000"
    },
    mozFocusInner: { border: 0 }
};

const CountryRegionSelector = ({className, isDesktop, country, region, onCountryChange, onRegionChange}) => {
    return (
        <CountrySelectorBody
            className={className}
            isDesktop={isDesktop}
        >
            <CountrySelectorItem>
                <CountryDropdown
                    showDefaultOption={false}
                    value={country}
                    onChange={onCountryChange}
                    style={BASE_STYLE}
                />
            </CountrySelectorItem>
            <CountrySelectorItem>
                <RegionDropdown
                    showDefaultOption={false}
                    country={country}
                    value={region}
                    onChange={onRegionChange}
                    style={BASE_STYLE}
                />
            </CountrySelectorItem>
        </CountrySelectorBody>
    );
};

export default CountryRegionSelector;
