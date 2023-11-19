import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export interface AllValidationErrors {
  control_name: string;
  error_name: string;
  error_value: any;
}

export interface FormGroupControls {
  [key: string]: AbstractControl;
}

export function getFormValidationErrors(
  controls: FormGroupControls
): AllValidationErrors[] {
  let errors: AllValidationErrors[] = [];
  Object.keys(controls).forEach((key) => {
    const control = controls[key];
    if (control instanceof FormGroup) {
      errors = errors.concat(getFormValidationErrors(control.controls));
    }
    const controlErrors: ValidationErrors | null = controls[key].errors;
    if (controlErrors !== null) {
      Object.keys(controlErrors).forEach((keyError) => {
        errors.push({
          control_name: key,
          error_name: keyError,
          error_value: controlErrors[keyError],
        });
      });
    }
  });
  return errors;
}

export const getErrorValidator = (form: any): string => {
  const error: AllValidationErrors | undefined = getFormValidationErrors(
    form.controls
  ).shift();
  if (error) {
    let text;
    switch (error.error_name) {
      case 'required':
        text = `${error.control_name} is required!`;
        break;
      case 'pattern':
        text = `${error.control_name} has wrong pattern!`;
        break;
      case 'email':
        text = `${error.control_name} has wrong email format!`;
        break;
      case 'minlength':
        text = `${error.control_name} has wrong length! Required length: ${error.error_value.requiredLength}`;
        break;
      case 'areEqual':
        text = `${error.control_name} must be equal!`;
        break;
      default:
        text = `${error.control_name}: ${error.error_name}: ${error.error_value}`;
    }
    return text;
  }
  return '';
};
