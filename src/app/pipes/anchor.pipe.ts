import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'anchor' })
export class AnchorPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(values) {
    if (values) {
      Object.keys(values).map((key) => {
        const value = values[key];
        values[key] = this.walkThrough(value);
      });
    }
    return values;
  }

  walkThrough(value) {
    switch ((typeof value).toLowerCase()) {
      case 'object':
        return this.transform(value);
      case 'string':
        if (value.includes('http')) {
          return this.createAnchor(value);
        }
        break;
      default:
        break;
    }
    return value;
  }
  createAnchor(href) {
    return `<a href="${this.sanitizer.bypassSecurityTrustUrl(
      href
    )}">${href}</a>`;
  }
}
