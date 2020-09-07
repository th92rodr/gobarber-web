import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(errors: ValidationError) {
  const validationsErrors: Errors = {};

  errors.inner.forEach(error => {
    validationsErrors[error.path] = error.message;
  });

  return validationsErrors;
}
