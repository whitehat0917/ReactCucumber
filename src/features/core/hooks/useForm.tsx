import _ from 'lodash';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useFormValidator from './useFormValidator';

function useForm(initialState, constraints = {}) {
  const dipatch = useDispatch();
  const [formState, setState] = useState(initialState);
  const { errors, fieldValidate, validateAllFields } = useFormValidator(constraints);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.persist();

    setState((state) => {
      fieldValidate(e.target.name, {
        ...state,
        [e.target.name]: e.target.value,
      });

      return {
        ...state,
        [e.target.name]: e.target.value,
      };
    });
  }

  const handleSelectChange = (name) => (option) => {
    setState((state) => ({
      ...state,
      [name]: option?.value || '',
    }));
  };

  const handleNumber = (name) => (value) => {
    setState((state) => ({
      ...state,
      price: {
        ...state.price,
        [name]: value,
      },
    }));
  };

  const handleCheckbox = (name, value) => (event) => {
    // console.log('name -> ', name);
    // console.log('value -> ', value);

    setState((state) => ({
      ...state,
      [name]: [...state[name], value],
    }));
  };

  const handleSimpleCheckbox = (name, newValue) => (event) => {
    setState((state) => ({
      ...state,
      [name]: newValue,
    }));
  };

  const handleSimpleValue = (name) => (newValue) => {
    setState((state) => ({
      ...state,
      [name]: newValue,
    }));
  };

  function submitForm(e, submitAction, clear = true) {
    e.preventDefault();

    const { validationErrors } = validateAllFields(formState);

    if (!validationErrors || _.isEmpty(validationErrors)) {
      dipatch(submitAction(formState));
    }

    if (clear) {
      setState((state) => ({
        ...state,
        ...initialState,
      }));
    }
  }

  function processForm(e, onProcess) {
    e.preventDefault();

    const { validationErrors } = validateAllFields(formState);
    onProcess(formState, validationErrors);
  }

  function processFormSimple() {
    const { validationErrors } = validateAllFields(formState);

    return { formState, validationErrors };
  }

  return {
    formState,
    errors,
    handleChange,
    handleSelectChange,
    handleCheckbox,
    handleSimpleCheckbox,
    handleSimpleValue,
    handleNumber,
    submitForm,
    processForm,
    processFormSimple,
  };
}

export default useForm;
