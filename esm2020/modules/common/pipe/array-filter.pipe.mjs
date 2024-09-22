import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class ArrayFilterPipe {
    transform(items, key, value) {
        if (!items || !items.length || !key) {
            return items;
        }
        return items.filter((item) => {
            const keys = key.split('.');
            let itemValue = item;
            for (let i = 0; i < keys.length; i++) {
                itemValue = itemValue ? itemValue[keys[i]] : undefined;
                if (Array.isArray(itemValue)) {
                    return itemValue.some((subItem) => this.getNestedValue(subItem, keys.slice(i + 1).join('.')) ===
                        value);
                }
            }
            return itemValue === value;
        });
    }
    getNestedValue(obj, key) {
        return key
            .split('.')
            .reduce((acc, currKey) => (acc ? acc[currKey] : undefined), obj);
    }
}
ArrayFilterPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ArrayFilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
ArrayFilterPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: ArrayFilterPipe, name: "arrayFilter", pure: false });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ArrayFilterPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'arrayFilter',
                    pure: false,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXktZmlsdGVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWNhbGVuZGFyL3NyYy9tb2R1bGVzL2NvbW1vbi9waXBlL2FycmF5LWZpbHRlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQU1wRCxNQUFNLE9BQU8sZUFBZTtJQUMxQixTQUFTLENBQUMsS0FBZ0IsRUFBRSxHQUFXLEVBQUUsS0FBYztRQUNyRCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNuQyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDM0IsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFFckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3BDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUV2RCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQzVCLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FDbkIsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUNWLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDekQsS0FBSyxDQUNSLENBQUM7aUJBQ0g7YUFDRjtZQUVELE9BQU8sU0FBUyxLQUFLLEtBQUssQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxjQUFjLENBQUMsR0FBUSxFQUFFLEdBQVc7UUFDMUMsT0FBTyxHQUFHO2FBQ1AsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7OzRHQTlCVSxlQUFlOzBHQUFmLGVBQWU7MkZBQWYsZUFBZTtrQkFKM0IsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsSUFBSSxFQUFFLEtBQUs7aUJBQ1oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2FycmF5RmlsdGVyJyxcbiAgcHVyZTogZmFsc2UsXG59KVxuZXhwb3J0IGNsYXNzIEFycmF5RmlsdGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaXRlbXM6IHVua25vd25bXSwga2V5OiBzdHJpbmcsIHZhbHVlOiB1bmtub3duKTogdW5rbm93bltdIHtcbiAgICBpZiAoIWl0ZW1zIHx8ICFpdGVtcy5sZW5ndGggfHwgIWtleSkge1xuICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH1cblxuICAgIHJldHVybiBpdGVtcy5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGtleXMgPSBrZXkuc3BsaXQoJy4nKTtcbiAgICAgIGxldCBpdGVtVmFsdWUgPSBpdGVtO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlbVZhbHVlID0gaXRlbVZhbHVlID8gaXRlbVZhbHVlW2tleXNbaV1dIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW1WYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gaXRlbVZhbHVlLnNvbWUoXG4gICAgICAgICAgICAoc3ViSXRlbSkgPT5cbiAgICAgICAgICAgICAgdGhpcy5nZXROZXN0ZWRWYWx1ZShzdWJJdGVtLCBrZXlzLnNsaWNlKGkgKyAxKS5qb2luKCcuJykpID09PVxuICAgICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGl0ZW1WYWx1ZSA9PT0gdmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldE5lc3RlZFZhbHVlKG9iajogYW55LCBrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIGtleVxuICAgICAgLnNwbGl0KCcuJylcbiAgICAgIC5yZWR1Y2UoKGFjYywgY3VycktleSkgPT4gKGFjYyA/IGFjY1tjdXJyS2V5XSA6IHVuZGVmaW5lZCksIG9iaik7XG4gIH1cbn1cbiJdfQ==