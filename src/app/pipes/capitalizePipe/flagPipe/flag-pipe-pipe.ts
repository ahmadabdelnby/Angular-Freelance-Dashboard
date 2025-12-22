import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flagPipe'
})
export class FlagPipePipe implements PipeTransform {
  transform(code: string): string {
    if (!code) return '';
    return code
      .toUpperCase()
      .replace(/./g, char =>
        String.fromCodePoint(127397 + char.charCodeAt(0))
      );
  }

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

}
