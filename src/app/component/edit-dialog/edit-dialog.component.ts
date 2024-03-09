import { Inject } from '@angular/core';
import { Component, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService, Data } from '../data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { generalConfig } from '../constants/generalConfig';
import { Country, State, City } from 'country-state-city';
import { ActivatedRoute, Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ToastrService } from 'ngx-toastr';

export interface Tag {
  name: string;
}
@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [];

  announcer = inject(LiveAnnouncer);
  comision = 24;
  pattern = generalConfig.pattern;
  patternMessage = generalConfig.patternMessages;

  valorFinal: any;
  public isAvailable$ = new BehaviorSubject<boolean>(false);
  public state$: Observable<Data> | undefined;
  planForm: FormGroup;
  selectedAddress: string | undefined;
  countries: any;
  states: any;
  selectedImage: string | ArrayBuffer | null = null;
  invalidImageSize: boolean = false;
  fileimage: any;
  checkboxValue: boolean = false;
  data: any;
  formData: any;
  addressOption: any = [];
  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data1: any
  ) {
    this.formData = data1;
    this.planForm = fb.group({
      first_name: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(generalConfig.pattern.NAMEMAXLENGTH),
        Validators.pattern(generalConfig.pattern.ALPHANUMERICANDSPECIALCHAR),
      ]),
      last_name: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(generalConfig.pattern.NAMEMAXLENGTH),
        Validators.pattern(generalConfig.pattern.ALPHANUMERICANDSPECIALCHAR),
      ]),
      mob_no: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(generalConfig.pattern.MOBILEMAX),
        Validators.pattern(generalConfig.pattern.MOB_NO),
      ]),
      email: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(generalConfig.pattern.EMAILMAXLENGTH),
        Validators.pattern(generalConfig.pattern.EMAIL),
      ]),
      state: new FormControl({ value: '', disabled: false }, [
        Validators.required,
      ]),
      country: new FormControl({ value: '', disabled: false }, [
        Validators.required,
      ]),
      address: new FormControl({ value: '', disabled: false }, [
        Validators.required,
      ]),
      address1: [''],
      address2: [''],
      company1: [''],
      company2: [''],
      check: new FormControl({ value: '', disabled: false }, []),
    });
  }

  ngOnInit(): void {
    this.addressOption = ["Home", "Company"];
    this.selectedAddress = this.formData.address || '';
    this.validateRequiredFields();
    this.state$ = this.dataService.getState();
    this.countries = Country.getAllCountries();
    this.states = State.getAllStates();
    this.planForm.patchValue({
      first_name: this.formData.first_name,
      last_name: this.formData.last_name,
      mob_no: this.formData.mob_no,
      email: this.formData.email,
      state: this.formData.state,
      country: this.formData.country,
      address: this.formData.address,
      address1: this.formData.address1,
      address2: this.formData.address2,
      company1: this.formData.company1,
      company2: this.formData.company2,
    });
    this.valorFinal = this.formData.age;
    this.formData?.tags?.map((ele: any) => {
      this.tags.push(ele);
    });
  }

  validateRequiredFields() {
    const address1Control = this.planForm.get('address1');
    const address2Control = this.planForm.get('address2');
    const company1Control = this.planForm.get('company1');
    const company2Control = this.planForm.get('company2');
  
    if (this.selectedAddress === 'Home') {
      address1Control?.setValidators([Validators.required]);
      address2Control?.setValidators([Validators.required]);
      company1Control?.clearValidators();
      company2Control?.clearValidators();
    } else if (this.selectedAddress === 'Company') {
      address1Control?.clearValidators();
      address2Control?.clearValidators();
      company1Control?.setValidators([Validators.required]);
      company2Control?.setValidators([Validators.required]);
    }
  
    address1Control?.updateValueAndValidity();
    address2Control?.updateValueAndValidity();
    company1Control?.updateValueAndValidity();
    company2Control?.updateValueAndValidity();
  }  

  onAddressSelectionChange(event: any) {
    this.selectedAddress = event.value;
    this.validateRequiredFields();
 }

  onSubmit() {
    if (this.planForm.invalid) {
      return;
    }

    let obj = {
      first_name: this.planForm.value.first_name,
      last_name: this.planForm.value.last_name,
      mob_no: this.planForm.value.mob_no,
      email: this.planForm.value.email,
      age: this.comision,
      country: this.planForm.value.country,
      state: this.planForm.value.state,
      address: this.planForm.value.address,
      address1: this.planForm.value.address1,
      address2: this.planForm.value.address2,
      company1: this.planForm.value.company1,
      company2: this.planForm.value.company2,
      tags: this.tags,
      image: this.formData.image,
      newsLetter: this.checkboxValue,
    };

    this.data = obj;
    this.dataService.setState(this.data);
    this.router.navigate(['/profile']);
    this.onNoClick();
    this.toastr.success('Profile updated successfully');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getComision(event: any) {
    this.comision = event.value;
    this.valorFinal = event.value;
  }
  getSelectedCountryValue() {}

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push({ name: value });
    }

    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${tag}`);
    }
  }

  edit(tag: Tag, event: MatChipInputEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(tag);
      return;
    }

    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index].name = value;
    }
  }

  getSelectedStateValue() {}
}
