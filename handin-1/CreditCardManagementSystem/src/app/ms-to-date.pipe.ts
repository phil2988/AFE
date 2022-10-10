import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msToDate'
})
export class MsToDatePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    return new Date(value);
  }
}
