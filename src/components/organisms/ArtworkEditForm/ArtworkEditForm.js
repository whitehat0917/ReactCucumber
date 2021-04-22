import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from 'molecules/TextField';
import SelectWithLabel from 'molecules/SelectWithLabel';
import Toggle from 'atoms/Toggle';
import NumberFormat from 'react-number-format';
import { CATEGORIES, STATUSES } from 'constants/artworks';

const FormRow = styled.div`
  display: flex;
  margin: 0.6rem 0 1.25rem;
`;

const FieldWrapper = styled.div`
  flex-basis: ${({ basis }) => basis || 'auto'};
  margin-left: ${({ marginLeft }) => marginLeft || '0'};
  margin-right: ${({ marginRight }) => marginRight || '0'};
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 0.6rem;
  height: 100%;
`;

const PriceField = (props) => (
  <NumberFormat
    label="Price"
    thousandSeparator
    prefix="$"
    customInput={TextField}
    decimalScale={2}
    isNumericString
    allowNegative={false}
    {...props}
  />
);

const DimensionField = (props) => (
  <NumberFormat
    thousandSeparator
    customInput={TextField}
    decimalScale={2}
    isNumericString
    allowNegative={false}
    {...props}
  />
);

const YearField = (props) => (
  <NumberFormat
    customInput={TextField}
    allowNegative={false}
    {...props}
  />
);

class ArtworkEditForm extends Component {
  convertDimensionTo = (metric, dimension) => {
    if (!dimension) return '';
    if (metric === 2) return `${Number(dimension) / 2.54}`;
    return `${Number(dimension) * 2.54}`;
  }

  handleToggleChange = () => {
    const {
      onChange, metric, height, width, depth,
    } = this.props;
    const newMetric = (metric % 2) + 1;
    onChange('metric', newMetric)();
    onChange('height')({ value: this.convertDimensionTo(newMetric, height) });
    onChange('width')({ value: this.convertDimensionTo(newMetric, width) });
    onChange('depth')({ value: this.convertDimensionTo(newMetric, depth) });
  }

  render() {
    const {
      title, year, onChange, subCategory, height, width, depth, edition, price,
      location, status: statusCode, category: categoryCode, metric, errors,
    } = this.props;
    const categories = Object.values(CATEGORIES);
    const statuses = Object.values(STATUSES);
    const status = statusCode === null ? null : STATUSES[statusCode];
    const category = categoryCode === null ? null : CATEGORIES[categoryCode];
    const metricToggleOn = metric === 2;

    return (
      <Fragment>
        <FormRow>
          <FieldWrapper basis="80%" marginRight="0.5rem">
            <TextField
              label="Title"
              placeholder="The Best Flag in History"
              value={title}
              onChange={onChange('title')}
              error={Boolean(errors.title)}
              errorText={errors.title}
              id="artworkTitle"
            />
          </FieldWrapper>
          <FieldWrapper basis="20%">
            <YearField
              label="Year"
              placeholder="2017"
              value={year}
              onChange={onChange('year')}
              error={Boolean(errors.year)}
              errorText={errors.year}
            />
          </FieldWrapper>
        </FormRow>
        <FormRow>
          <SelectWithLabel
            label="Category"
            onChange={onChange('category')}
            value={category}
            options={categories}
            placeholder="Painting"
            isClearable
            error={Boolean(errors.category)}
            errorText={errors.category}
          />
        </FormRow>
        <FormRow>
          <TextField
            label="Sub-Category"
            placeholder="Oil color"
            value={subCategory}
            onChange={onChange('subCategory')}
            error={Boolean(errors.sub_category)}
            errorText={errors.sub_category}
          />
        </FormRow>
        <FormRow>
          <FieldWrapper basis="30%" marginRight="0.5rem">
            <DimensionField
              label="Height"
              placeholder="50"
              value={height}
              onValueChange={onChange('height')}
              error={Boolean(errors.height)}
              errorText={errors.height}
            />
          </FieldWrapper>
          <FieldWrapper basis="30%" marginRight="0.5rem">
            <DimensionField
              label="Width"
              placeholder="120"
              value={width}
              onValueChange={onChange('width')}
              error={Boolean(errors.width)}
              errorText={errors.width}
            />
          </FieldWrapper>
          <FieldWrapper basis="30%" marginRight="0.5rem">
            <DimensionField
              label="Depth"
              placeholder="5"
              value={depth}
              onValueChange={onChange('depth')}
              error={Boolean(errors.depth)}
              errorText={errors.depth}
            />
          </FieldWrapper>
          <FieldWrapper basis="10%">
            <ToggleWrapper>
              <Toggle
                checked={metricToggleOn}
                onChange={this.handleToggleChange}
                rightLabel="in"
                leftLabel="cm"
              />
            </ToggleWrapper>
          </FieldWrapper>
        </FormRow>
        <FormRow>
          <TextField
            label="Edition"
            placeholder="Edition"
            value={edition}
            onChange={onChange('edition')}
            error={Boolean(errors.edition)}
            errorText={errors.edition}
          />
        </FormRow>
        <FormRow>
          <SelectWithLabel
            label="Status"
            value={status}
            onChange={onChange('status')}
            options={statuses}
            isClearable
            placeholder="Status"
            error={Boolean(errors.status)}
            errorText={errors.status}
          />
        </FormRow>
        <FormRow>
          <FieldWrapper basis="50%" marginRight="0.5rem">
            <PriceField
              placeholder="$540.00"
              value={price}
              onValueChange={onChange('price')}
              error={Boolean(errors.price)}
              errorText={errors.price}
            />
          </FieldWrapper>
          <FieldWrapper basis="50%">
            <TextField
              label="Location"
              value={location}
              onChange={onChange('location')}
              placeholder="New York"
              error={Boolean(errors.current_location)}
              errorText={errors.current_location}
            />
          </FieldWrapper>
        </FormRow>
      </Fragment>
    );
  }
}

ArtworkEditForm.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  category: PropTypes.number,
  subCategory: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  depth: PropTypes.string,
  edition: PropTypes.string,
  status: PropTypes.number,
  price: PropTypes.string,
  location: PropTypes.string,
  metric: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default ArtworkEditForm;
