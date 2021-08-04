import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { CitiesService } from '../../services/cities.service';
import { CustomValidators } from '../../utils/validators'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public citiesData: any;

  constructor( 
    private router: Router,
    private citiesSrevice: CitiesService
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3)
      ]),
      patronymic: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      country: new FormControl(''),
      city: new FormControl(''),
      dateBirth: new FormControl('', [
        Validators.required,
        CustomValidators.CalendarValidator('dateShootingStart')
      ]),
      dateShootingStart: new FormControl(''),
      camera: new FormControl(''),
      lens: new FormControl(''),
      aboutMyself: new FormControl('', [
        Validators.maxLength(250),
      ])
    })

    this.citiesSrevice.getData()
      .subscribe((data: any) => this.citiesData = data.city.reduce((a: City[], b: City[]) => a.concat(b), []));

    this.cityControl.valueChanges.subscribe(() => {
      this.countryControl.setValidators([Validators.required]);
      this.countryControl.updateValueAndValidity({ emitEvent: false });
    })

    this.dateShootingStartControl.valueChanges.subscribe(() => {
      this.dateBirthControl.updateValueAndValidity({ emitEvent: false });
    })

    this.lensControl.valueChanges.subscribe(() => {
      this.cameraControl.setValidators([Validators.required]);
      this.cameraControl.updateValueAndValidity({ emitEvent: false });
    })
  }

  public submit():void {
    if(this.registerForm.valid) {
      this.router.navigate(['/home']);
    }
  }

  get nameControl(): AbstractControl {
    return this.registerForm.get('name') as AbstractControl;
  }
  get patronymicControl(): AbstractControl {
    return this.registerForm.get('patronymic') as AbstractControl;
  }
  get countryControl(): AbstractControl {
    return this.registerForm.get('country') as AbstractControl;
  }
  get cityControl(): AbstractControl {
    return this.registerForm.get('city') as AbstractControl;
  }
  get dateBirthControl(): AbstractControl {
    return this.registerForm.get('dateBirth') as AbstractControl;
  }
  get dateShootingStartControl(): AbstractControl {
    return this.registerForm.get('dateShootingStart') as AbstractControl;
  }
  get cameraControl(): AbstractControl {
    return this.registerForm.get('camera') as AbstractControl;
  }
  get lensControl(): AbstractControl {
    return this.registerForm.get('lens') as AbstractControl;
  }
  get aboutMyselfControl(): AbstractControl {
    return this.registerForm.get('aboutMyself') as AbstractControl;
  }
}
