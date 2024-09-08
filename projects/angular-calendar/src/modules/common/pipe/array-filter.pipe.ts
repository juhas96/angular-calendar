import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFilter',
  pure: false,
})
export class ArrayFilterPipe implements PipeTransform {
  transform(items: unknown[], key: string, value: unknown): unknown[] {
    if (!items || !items.length || !key) {
      return items;
    }

    return items.filter((item) => {
      const keys = key.split('.');
      let itemValue = item;

      for (let i = 0; i < keys.length; i++) {
        itemValue = itemValue ? itemValue[keys[i]] : undefined;

        if (Array.isArray(itemValue)) {
          return itemValue.some(
            (subItem) =>
              this.getNestedValue(subItem, keys.slice(i + 1).join('.')) ===
              value
          );
        }
      }

      return itemValue === value;
    });
  }

  private getNestedValue(obj: any, key: string): any {
    return key
      .split('.')
      .reduce((acc, currKey) => (acc ? acc[currKey] : undefined), obj);
  }
}
