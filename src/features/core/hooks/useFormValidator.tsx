import { useState } from 'react';
import _ from 'lodash';
import validate from 'validate.js';

function useFormValidator (constraints) {
    const [errors, setErrors] = useState({});

    const fieldValidate = (targetName, formState) => {
        const validationErrors = validate(formState, constraints);

        if (!_.isEmpty(validationErrors) && validationErrors[targetName]) {
            const error = validationErrors[targetName];
    
            setErrors(state => ({
                ...state,
                [targetName]: error,
            }));
        } else {
            if (typeof validationErrors === 'undefined' ) {
                setErrors({});
            } else {
                setErrors(state => ({
                    ...state,
                    [targetName]: null,
                }));
            }
        }
    }

    const validateAllFields = (formState) => {
        const validationErrors = validate(formState, constraints);

        setErrors(validationErrors);

        return {
            validationErrors
        };
    };

    return {
        errors,
        fieldValidate,
        validateAllFields,
    };

}

export default useFormValidator;