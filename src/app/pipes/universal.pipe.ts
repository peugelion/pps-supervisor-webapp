import { Pipe, PipeTransform } from '@angular/core';

/* https://codeburst.io/angular-bad-practices-eab0e594ce92 */

@Pipe({
  name: 'map'
})
export class MappingPipe implements PipeTransform {
  /*
  this will be a universal pipe for array mappings. You may add more
  type checkings and runtime checkings to make sure it works correctly everywhere
  */
  transform(value, mappingFunction: Function) {
    return mappingFunction(value);
  }
}

@Pipe({
  // genericMapPipe with 2+ arguments passed to the function
  name: 'map_Spread'
})
export class MappingPipe2 implements PipeTransform {
  transform(values, mappingFunction: Function) {
    return mappingFunction(...values);
  }
}
