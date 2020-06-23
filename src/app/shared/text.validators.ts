import { ValidatorFn, AbstractControl } from '@angular/forms';
import { keyframes } from '@angular/animations';

export function validateFormat(reg: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const valid = reg.test(control.value)
        return valid ? null : {'invalidFormat': {value: control.value}}
    }
}
