import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-skill',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './create-skill.html',
  styleUrl: './create-skill.scss',
  encapsulation: ViewEncapsulation.None
})
export class CreateSkill {
  form: FormGroup;
  mode: 'create' | 'update';
  document: any;
  specialties: any[] = [];

  constructor(
    private fb: FormBuilder,
    @Inject('data') private data: any,
    @Inject('onClose') private onClose: () => void,
    @Inject('onSubmit') private onSubmit: (formData: any) => void
  ) {
    this.mode = data.mode;
    this.document = data.document || {};
    this.specialties = data.specialties || [];

    this.form = this.fb.group({
      _id: [this.document._id || null], // add _id,
      name: [this.document.name || '', Validators.required],
      description: [this.document.description || ''],
      // In the constructor
      specialty: [{ value: this.document.specialty?._id?.toString() || this.document.specialty?.toString() || '', disabled: !this.specialties.length }],
      isActive: [
        this.document.isActive !== undefined ? this.document.isActive : true
      ]
    });
    if (this.specialties.length && this.form.get('specialty')?.disabled) {
      this.form.get('specialty')?.enable();
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

