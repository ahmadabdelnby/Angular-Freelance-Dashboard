import { CommonModule } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-proposal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './create-proposal.html',
  styleUrls: ['./create-proposal.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateProposal {
  form: FormGroup;
  mode: 'create' | 'update';
  document: any;

  statuses = ['submitted', 'viewed', 'accepted', 'rejected', 'withdrawn'];

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
      job_id: [
        this.document.job_id?._id || this.document.job_id || '', 
        Validators.required
      ],
      freelancer_id: [
        this.document.freelancer_id?._id || this.document.freelancer_id || '', 
        Validators.required
      ],
      coverLetter: [
        this.document.coverLetter || '', 
        [Validators.required, Validators.minLength(50), Validators.maxLength(2000)]
      ],
      message: [
        this.document.message || '', 
        Validators.maxLength(1000)
      ],
      bidAmount: [
        this.document.bidAmount || 0, 
        [Validators.required, Validators.min(0)]
      ],
      deliveryTime: [
        this.document.deliveryTime || 1, 
        [Validators.required, Validators.min(1)]
      ],
      status: [this.document.status || 'submitted']
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
      job_id: formValue.job_id,
      freelancer_id: formValue.freelancer_id,
      coverLetter: formValue.coverLetter,
      message: formValue.message,
      bidAmount: formValue.bidAmount,
      deliveryTime: formValue.deliveryTime,
      status: formValue.status
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
