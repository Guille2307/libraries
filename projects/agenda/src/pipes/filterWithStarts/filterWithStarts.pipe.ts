import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterWithStarts'
})

export class FilterWithStartsPipe implements PipeTransform {

  constructor() { }

  transform(value: any, filter, args: any, months: any): any {

    if (!value) {
      return null;
    }
    if (args.trim() === '' && filter === 'all') {
      return value;
    }

    args = args.toLowerCase();

    return value.filter(item => {
      const month = months[this.getDate(item.starts)];
      if (filter === 'all') {
        return JSON.stringify(item).toLowerCase().includes(args.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
      } else {
        return JSON.stringify(item).toLowerCase().includes(args.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        && month.toLowerCase().includes(month[filter]);
      }
    });
  }

  getDate(date) {
    let iosDate = new Date().getTime();
    const tSD = date.split(/[- :]/);
    const dSD = new Date(tSD[0], tSD[1] - 1, tSD[2], tSD[3], tSD[4], tSD[5]);
    iosDate = new Date(dSD).getTime();
    return new Date(iosDate).getMonth();
  }
}
