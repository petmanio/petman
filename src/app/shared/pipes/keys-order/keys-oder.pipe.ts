import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'appKeysOrder'})
export class KeysOrderPipe implements PipeTransform {
  transform(value: any[] = [], order: string[] = []): any {
    let ordered = [];
    order.forEach((key) => {
      const el = value.filter(item => item.key === key);
      if (el.length) {
        ordered = ordered.concat(el);
      }
    });
    return ordered;
  }
}
