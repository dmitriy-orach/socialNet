import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";

export class CustomValidators {
    public static CalendarValidator(dateShootingStart: string): ValidatorFn {
        return(control: AbstractControl): ValidationErrors | any => {
            if(control.parent) {
                const firstDate = Date.parse(control.value);
                const secondDate = Date.parse(control.parent.get(dateShootingStart)?.value);
                return (firstDate >= secondDate) ? {dateIsLessThanAcceptable: true} : null;
            } else {
                return null;
            }
        };
    }
}