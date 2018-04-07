import { Pipe, PipeTransform } from '@angular/core';
import { UtilService } from '../../services';
import { cloneDeep } from 'lodash';
@Pipe({name: 'dateFormat'})
export class DateFormatPipe implements PipeTransform {
  transform(data: any) {
    return UtilService.formatHours(cloneDeep(data));
  }
}
