import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ejemploPipe',
})
export class EjemploPipe implements PipeTransform {

  constructor() {
  }

  transform(value, args) {
    // Tu lógica...
    return '';
  }
}
