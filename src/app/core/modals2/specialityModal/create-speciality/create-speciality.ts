import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-speciality',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './create-speciality.html',
  styleUrl: './create-speciality.scss',
})
export class CreateSpeciality {
  form: FormGroup;
  mode: 'create' | 'update';
  document: any;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    @Inject('data') private data: any,
    @Inject('onClose') private onClose: () => void,
    @Inject('onSubmit') private onSubmit: (formData: any) => void
  ) {
    this.mode = data.mode;
    this.document = data.document || {};
    this.categories = data.categories || [];

    this.form = this.fb.group({
      _id: [this.document._id || null], // add _id,
      name: [this.document.name || '', Validators.required],
      description: [this.document.description || ''],
      // In the constructor
      Category: [{ value: this.document.Category?._id?.toString() || this.document.Category?.toString() || '', disabled: !this.categories.length }],
      isActive: [
        this.document.isActive !== undefined ? this.document.isActive : true
      ]
    });
    if (this.categories.length && this.form.get('categories')?.disabled) {
      this.form.get('categories')?.enable();
    }
  }

  submit() {
    if (this.form.valid) {
      const payload = {
        ...this.form.value,
        _id: this.document._id // only for update
      };
      this.onSubmit(payload);
    }
  }

  close() {
    this.onClose();
  }
}
