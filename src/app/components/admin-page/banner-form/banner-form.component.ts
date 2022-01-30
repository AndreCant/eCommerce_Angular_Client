import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreateAction, EBannerActions, UpdateAction } from 'src/app/actions/banner.actions';
import { Banner } from 'src/app/model/Banner';
import { IAppState } from 'src/app/state/app.states';

@Component({
  selector: 'app-banner-form',
  templateUrl: './banner-form.component.html',
  styleUrls: ['./banner-form.component.css']
})
export class BannerFormComponent implements OnInit {

  @Input()
  banner?: Banner;

  @Output()
  bannerEvent: EventEmitter<boolean>;

  bannerForm: FormGroup;
  isButtonDisabled: boolean = false;
  destroyed$ = new Subject<boolean>();
  fileName?: string;
  imageSrc?: string;
  image?: File;

  constructor(private fb: FormBuilder, private store: Store<IAppState>, updates$: Actions, private toastr: ToastrService) { 
    this.bannerEvent = new EventEmitter();

    this.bannerForm = this.fb.group({
      id: [0, []],
      name: ['', [Validators.required]],
      title: ['', []],
      subTitle: ['', []],
    });

    updates$.pipe(
      ofType(EBannerActions.CREATE_SUCCESS),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.enableButton();
      this.toastr.success('', 'OK');
      this.close();
    });

    updates$.pipe(
      ofType(EBannerActions.UPDATE_SUCCESS),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.enableButton();
      this.toastr.success('', 'OK');
      this.close();
    });
  }

  ngOnInit(): void {
    if(this.banner) this.populateForm();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  populateForm(){
    this.bannerForm = this.fb.group({
      id: [this.banner?.id, []],
      name: [this.banner?.name, [Validators.required]],
      title: [this.banner?.title, []],
      subTitle: [this.banner?.sub_title, []]
    });

    if (this.banner?.image) this.imageSrc = this.banner?.image;
  }

  disableButton(){
    this.isButtonDisabled = true;
  }

  enableButton(){
    this.isButtonDisabled = false;
  }

  close(){
    this.bannerEvent.emit(true);
    this.bannerForm.reset();
  }

  saveBanner(){
    this.disableButton();

    const values = this.bannerForm.value;
    const formData = new FormData();

    if(values.name) formData.append("name", values.name);
    if(values.title) formData.append("title", values.title);
    if(values.subTitle) formData.append("sub_title", values.subTitle);
    if(this.image) formData.append("image", this.image);

    if (this.banner && this.banner.id) {
      this.store.dispatch(new UpdateAction(formData, this.banner.id));
    }else{
      this.store.dispatch(new CreateAction(formData));
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
  
    if (file) {
      this.fileName = file.name;
      this.image = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      }
    }
  }
}
