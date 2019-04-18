import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'slicerCustom'
})

export class SlicingCustomPipe implements PipeTransform{
    transform(value: string, sliceTo: number): string{
        let data = value.slice(0,sliceTo);
        return data;
    }
}