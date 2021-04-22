import { useState, useEffect } from 'react';
import validate from 'validate.js';

function useFormValidator (schema, formState) {
    const [errors, setError] = useState();

    useEffect(() => {

        setError(state => validate(formState, schema))

    }, [formState]);

    return {
        errors,
    };

}

export default useFormValidator;