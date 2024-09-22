import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ArrayFilterPipe implements PipeTransform {
    transform(items: unknown[], key: string, value: unknown): unknown[];
    private getNestedValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<ArrayFilterPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<ArrayFilterPipe, "arrayFilter", false>;
}
