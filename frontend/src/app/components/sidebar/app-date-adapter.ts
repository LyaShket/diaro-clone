import { MatDateFormats, NativeDateAdapter } from "@angular/material/core";

export class AppDateAdapter extends NativeDateAdapter {
  // @ts-ignore
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      let day: string = date.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (date.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    if (displayFormat === 'label') {
      return date.toDateString();
    }

    return date.toJSON();
  }
}

export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'label',
  },
  display: {
    dateInput: 'input',
    monthYearLabel: 'label',
    dateA11yLabel: 'label',
    monthYearA11yLabel: 'label',
  }
};
