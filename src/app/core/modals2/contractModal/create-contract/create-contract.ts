import { CommonModule } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-contract',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './create-contract.html',
  styleUrls: ['./create-contract.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateContract {
  form: FormGroup;
  mode: 'create' | 'update';
  document: any;

  statuses = ['pending', 'active', 'completed', 'cancelled', 'disputed'];
  budgetTypes = ['fixed', 'hourly'];

  constructor(
    private fb: FormBuilder,
    @Inject('data') private data: any,
    @Inject('onClose') private onClose: () => void,
    @Inject('onSubmit') private onSubmit: (formData: any) => void
  ) {
    this.mode = data.mode;
    this.document = data.document || {};

    this.form = this.fb.group({
      _id: [this.document._id || null],
      job: [
        this.document.job?._id || this.document.job || '', 
        Validators.required
      ],
      client: [
        this.document.client?._id || this.document.client || '', 
        Validators.required
      ],
      freelancer: [
        this.document.freelancer?._id || this.document.freelancer || '', 
        Validators.required
      ],
      proposal: [
        this.document.proposal?._id || this.document.proposal || ''
      ],
      agreedAmount: [
        this.document.agreedAmount || 0, 
        [Validators.required, Validators.min(1)]
      ],
      budgetType: [
        this.document.budgetType || 'fixed', 
        Validators.required
      ],
      status: [this.document.status || 'pending'],
      terms: [this.document.terms || ''],
      startDate: [
        this.document.startDate ? new Date(this.document.startDate).toISOString().split('T')[0] : ''
      ],
      endDate: [
        this.document.endDate ? new Date(this.document.endDate).toISOString().split('T')[0] : ''
      ]
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
      job: formValue.job,
      client: formValue.client,
      freelancer: formValue.freelancer,
      agreedAmount: formValue.agreedAmount,
      budgetType: formValue.budgetType,
      status: formValue.status,
      terms: formValue.terms
    };

    if (formValue.proposal) {
      payload.proposal = formValue.proposal;
    }

    if (formValue.startDate) {
      payload.startDate = formValue.startDate;
    }

    if (formValue.endDate) {
      payload.endDate = formValue.endDate;
    }

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
    if (control?.hasError('min')) {
      const min = control.errors?.['min'].min;
      return `Minimum value is ${min}`;
    }
    return '';
  }
}
