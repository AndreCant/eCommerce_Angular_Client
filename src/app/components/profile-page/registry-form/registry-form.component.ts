import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ERegistryActions, UpdateRegistryAction } from 'src/app/actions/registry.actions';
import { Registry } from 'src/app/model/Registry';
import { IAppState } from 'src/app/state/app.states';
import { CustomValidators } from 'src/app/utility/CustomValidators';

@Component({
  selector: 'app-registry-form',
  templateUrl: './registry-form.component.html',
  styleUrls: ['./registry-form.component.css']
})
export class RegistryFormComponent implements OnInit {

  registryForm: FormGroup;
  destroyed$ = new Subject<boolean>();
  
  constructor(private fb: FormBuilder, private store: Store<IAppState>, updates$: Actions) {
    updates$.pipe(
      ofType(ERegistryActions.UPDATE_SUCCESS),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      alert('okok');
    });
    
    this.registryForm = this.fb.group({
          id: [0, []],
          name: ['', []],
          surname: ['', []],
          phone: [0, [CustomValidators.validatePhone]],
          street: ['', []],
          city: ['', []],
          county: ['', []],
          postal_code: [0, [CustomValidators.validatePostalCode]],
          state: ['', []]
      });
  }
  
  @Input()
  set registry(registry: Registry | undefined | null) {
    if(registry) {
      this.registryForm.get('id')?.setValue(registry?.id);
      this.registryForm.get('name')?.setValue(registry?.name);
      this.registryForm.get('surname')?.setValue(registry?.surname);
      this.registryForm.get('phone')?.setValue(registry?.phone);
      this.registryForm.get('street')?.setValue(registry?.street);
      this.registryForm.get('city')?.setValue(registry?.city);
      this.registryForm.get('county')?.setValue(registry?.county);
      this.registryForm.get('postal_code')?.setValue(registry?.postal_code);
      this.registryForm.get('state')?.setValue(registry?.state);
    }
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  saveRegistry(){
    this.store.dispatch(new UpdateRegistryAction(this.registryForm.value));
  }

}
