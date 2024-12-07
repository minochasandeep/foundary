export const handleFormValidationError = (validationErrors: any, setError: any) => {
    if (validationErrors.length > 0) {
        validationErrors.map((error: any) => {
            setError(error.field, { message: error.error });
        });
    }
};
