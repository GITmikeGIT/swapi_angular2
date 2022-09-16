import { Pipe, PipeTransform } from '@angular/core';
import { UrlSerializer } from '@angular/router';

@Pipe({ name: 'anchor' })
export class AnchorPipe implements PipeTransform {
  serializer: UrlSerializer;
  transform(values) {
    values.entries((entry) => {
      if ((typeof entry).toLowerCase() === 'array') {
        console.log(entry);
      }
    });
  }
}
