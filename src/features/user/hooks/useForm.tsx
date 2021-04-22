import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function useForm (initialState) {
    const dipatch = useDispatch();
    const [formState, setState] = useState(initialState);

    function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
        e.persist();

        setState((state) => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    function submitForm (submitAction) {
        dipatch(submitAction(formState));
    }

    return {
        formState,
        handleChange,
        submitForm
    };

}

export default useForm;