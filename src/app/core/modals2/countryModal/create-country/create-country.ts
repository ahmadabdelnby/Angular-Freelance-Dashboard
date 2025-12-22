import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-country',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './create-country.html',
  styleUrl: './create-country.scss',
})
export class CreateCountry {
  form: FormGroup;
  mode: 'create' | 'update';
  document: any;

  constructor(
    private fb: FormBuilder,
    @Inject('data') private data: any,
    @Inject('onClose') private onClose: () => void,
    @Inject('onSubmit') private onSubmit: (formData: any) => void
  ) {
    this.mode = data.mode;
    this.document = data.document || {};

    this.form = this.fb.group({
      _id: [this.document._id || null], // add _id,
      name: [this.document.name || '', Validators.required],
      code: [this.document.code || ''],
      flag: [this.document.flag || ''],
      // In the constructor
      isActive: [
        this.document.isActive !== undefined ? this.document.isActive : true
      ]
    });
  }

  submit() {
    if (this.form.valid) {
      const payload = {
        ...this.form.value,
        _id: this.document._id // only for update
      };
      this.onSubmit(payload);
      console.log(payload);
      
    }
  }

  close() {
    this.onClose();
  }
}
