import { Pipe, PipeTransform } from '@angular/core';
import { CustomError } from '../../services';

@Pipe({ name: 'appErrorMessages' })
export class ErrorMessagesPipe implements PipeTransform {
  transform(error): string {
    try {
      error = JSON.parse(error);
    } catch (err) {}
    const message = error.message || error;
    return CustomError.errorMessagesMap[message] || message;
  }
}
