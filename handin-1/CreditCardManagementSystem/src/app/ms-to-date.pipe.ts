import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msToDate'
})
export class MsToDatePipe implements PipeTransform {
  transform(value: number, format=""): unknown {
    switch (format) {
      case "wwwmmmddyyyy":
        return new Date(value).toDateString()
      default:
        return new Date(value);
    }
  }
}
