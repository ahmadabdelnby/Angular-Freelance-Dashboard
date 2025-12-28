import { CommonModule } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './create-job.html',
  styleUrls: ['./create-job.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateJob {
  form: FormGroup;
  mode: 'create' | 'update';
  document: any;
  specialties: any[] = [];
  skills: any[] = [];

  budgetTypes = ['fixed', 'hourly'];
  statuses = ['open', 'in_progress', 'completed', 'cancelled'];
  durationUnits = ['days', 'weeks', 'months'];

  constructor(
    private fb: FormBuilder,
    @Inject('data') private data: any,
    @Inject('onClose') private onClose: () => void,
    @Inject('onSubmit') private onSubmit: (formData: any) => void
  ) {
    this.mode = data.mode;
    this.document = data.document || {};
    this.specialties = data.specialties || [];
    this.skills = data.skills || [];

    this.form = this.fb.group({
      _id: [this.document._id || null],
      title: [this.document.title || '', [Validators.required, Validators.maxLength(200)]],
      description: [
        this.document.description || '', 
        [Validators.required, Validators.minLength(50), Validators.maxLength(5000)]
      ],
      specialty: [
        this.document.specialty?._id || this.document.specialty || '', 
        Validators.required
      ],
      skills: [
        this.document.skills?.map((s: any) => s._id || s) || []
      ],
      budgetType: [
        this.document.budget?.type || 'fixed', 
        Validators.required
      ],
      budgetAmount: [
        this.document.budget?.amount || 0, 
        [Validators.required, Validators.min(1)]
      ],
      status: [this.document.status || 'open'],
      durationValue: [this.document.duration?.value || 1, Validators.min(1)],
      durationUnit: [this.document.duration?.unit || 'weeks'],
      visibility: [this.document.visibility || 'public'],
      featured: [this.document.featured || false]
    });
  }

  submit() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    const formValue = this.form.value;
    
    const payload: any = {
      title: formValue.title,
      description: formValue.description,
      specialty: formValue.specialty,
      skills: formValue.skills || [],
      budget: {
        type: formValue.budgetType,
        amount: formValue.budgetAmount
      },
      status: formValue.status,
      duration: {
        value: formValue.durationValue,
        unit: formValue.durationUnit
      },
      visibility: formValue.visibility,
      featured: formValue.featured
    };

    if (this.mode === 'update' && formValue._id) {
      payload._id = formValue._id;
    }

    this.onSubmit(payload);
  }

  close() {
    this.onClose();
  }

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (control?.hasError('required')) {
      return `${fieldName} is required`;
    }
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Minimum length is ${minLength} characters`;
    }
    if (control?.hasError('maxlength')) {
      const maxLength = control.errors?.['maxlength'].requiredLength;
      return `Maximum length is ${maxLength} characters`;
    }
    if (control?.hasError('min')) {
      const min = control.errors?.['min'].min;
      return `Minimum value is ${min}`;
    }
    return '';
  }
}
