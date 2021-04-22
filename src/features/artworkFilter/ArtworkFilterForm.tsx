import React, { Fragment } from 'react';
import { v4 } from 'uuid';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import Typography from 'components/Typography';
import Checkbox from 'components/Checkbox';
import { CATEGORIES, STATUSES } from 'constants/artworks';
import Input from 'components/Input';
// import TaggedInput from 'atoms/TaggedInput';
import Icon from 'components/Icon';
import Button from 'components/Button';
import useForm from 'features/core/hooks/useForm';
import { applyFilter, resetFilter } from './artworkFilterSlice';

const HeaderWrapper = styled.div`
  padding: 0 0.5rem 0 3.375rem;
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Container = styled.div`
  display: flex;
  width: 23rem;
  flex-direction: column;
  flex: 1 0 auto;
  padding: 0 3.375rem;
  box-sizing: border-box;
  margin-top: 2rem;
`;

const CheckboxWrapper = styled.div`
  height: 1.25rem;
  margin: 0.75rem 0;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const SectionWrapper = styled.div`
  margin: 1.25rem 0;
`;

const SectionTitle = styled((props) => (<Typography type="subtitle2" {...props} />))`
  margin-bottom: 1rem;
`;

const Section = ({ title, children }) => (
  <SectionWrapper>
    <SectionTitle>{title}</SectionTitle>
    { children }
  </SectionWrapper>
);

// Section.propTypes = {
//   title: PropTypes.string.isRequired,
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node,
//   ]).isRequired,
// };

const PriceField = (props) => (
  <NumberFormat
    thousandSeparator
    prefix="$"
    customInput={Input}
    decimalScale={2}
    allowNegative={false}
    {...props}
  />
);

const LowerPrice = styled(PriceField)`
  margin-right: 0.5rem;
`;

const HigherPrice = styled(PriceField)`
  margin-left: 0.5rem;
`;

const ClearButtonWrapper = styled.div`
  margin-top: auto;
  display: flex;
  margin: 2.5rem 0;
  align-items: center;
`;

const ClearButton = styled((props) => <Typography color="primary" type="small" weight="600" {...props} />)`
  cursor: pointer;
  margin-left: 1rem;
`;

const renderSection = (section, items, onChange, selectedItems) => Object.values(items).map((category) => (
  <CheckboxWrapper key={v4()}>
    <Checkbox
      checked={selectedItems.includes(category.value)}
      onChange={onChange(section, category.value)}
      label={category.label}
    />
  </CheckboxWrapper>
));

const validateYearInput = (inputValue) => `${inputValue}`.length === 4;

const ArtworkFilterForm = ({
    dispatch,
    onClose
}) => {
    const { formState, handleSelectChange, handleCheckbox, handleNumber, submitForm } = useForm({
        categories: [],
        statuses: [],
        years: [],
        price: {
            min: {},
            max: {},
        }
    });

    // console.log('formState -> ', formState);

    return (
        <Fragment>
          <HeaderWrapper>
            <Typography type="h4">Filters</Typography>
            <Icon size={0.75} color="muted" clickable onClick={onClose}>close</Icon>
          </HeaderWrapper>
          <Container>
            <Section title="Category">
              {
                renderSection('categories', CATEGORIES, handleCheckbox, formState.categories)
              }
            </Section>
            <Section title="Status">
              {
                renderSection('statuses', STATUSES, handleCheckbox, formState.statuses)
              }
            </Section>
            {/*<Section title="Year">*/}
              {/*<TaggedInput*/}
                {/*placeholder="2017"*/}
                {/*type="number"*/}
                {/*onDelete={onYearsChange}*/}
                {/*onAdd={onYearsChange}*/}
                {/*validateInput={validateYearInput}*/}
                {/*values={filter.years}*/}
              {/*/>*/}
            {/*</Section>*/}
            <Section title="Price">
              <PriceWrapper>
                <LowerPrice
                  placeholder="$ min"
                  onValueChange={handleNumber('min')}
                  value={formState.price.min.formattedValue}
                />
                <HigherPrice
                  placeholder="$ max"
                  onValueChange={handleNumber('max')}
                  value={formState.price.max.formattedValue}
                />
              </PriceWrapper>
            </Section>
            <ClearButtonWrapper>
              <Button 
                size="small" 
                onClick={e => submitForm(e, applyFilter, false)} 
                // disabled={applyDisabled}
                >
                    Apply
                </Button>
              <ClearButton onClick={e => dispatch(resetFilter)}>Clear all</ClearButton>
            </ClearButtonWrapper>
          </Container>
        </Fragment>
      );
};

// ArtworkFilterForm.propTypes = {
//   onSubmitFilters: PropTypes.func.isRequired,
//   onCheckboxClick: PropTypes.func.isRequired,
//   onYearsChange: PropTypes.func.isRequired,
//   onPriceChange: PropTypes.func.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onReset: PropTypes.func.isRequired,
//   filter: PropTypes.shape({
//     categories: PropTypes.arrayOf(PropTypes.number),
//     statuses: PropTypes.arrayOf(PropTypes.number),
//     years: PropTypes.arrayOf(PropTypes.number),
//     price: PropTypes.object,
//   }).isRequired,
//   applyDisabled: PropTypes.bool,
// };

export default ArtworkFilterForm;
