import { CommonModule } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './create-user.html',
  styleUrls: ['./create-user.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateUser {
  form: FormGroup;
  mode: 'create' | 'update';
  document: any;
  countries: any[] = [];
  skills: any[] = [];
  specialties: any[] = [];
  categories: any[] = [];

  roles = ['user', 'admin'];
  genders = ['male', 'female'];
  availabilityOptions = ['available', 'busy', 'not_available'];
  proficiencyLevels = ['basic', 'conversational', 'fluent', 'native'];

  constructor(
    private fb: FormBuilder,
    @Inject('data') private data: any,
    @Inject('onClose') private onClose: () => void,
    @Inject('onSubmit') private onSubmit: (formData: any) => void
  ) {
    this.mode = data.mode;
    this.document = data.document || {};
    this.countries = data.countries || [];
    this.skills = data.skills || [];
    this.specialties = data.specialties || [];
    this.categories = data.categories || [];

    console.log('Modal Mode:', this.mode);
    console.log('Document Data:', this.document);

    const isUpdate = this.mode === 'update';

    this.form = this.fb.group({
      _id: [this.document._id || null],
      username: [this.document.username || '', Validators.required],
      email: [this.document.email || '', [Validators.required, Validators.email]],
      password: [
        '', 
        isUpdate ? [] : [Validators.required, Validators.minLength(6)]
      ],
      confirmPassword: [''],
      first_name: [this.document.first_name || '', Validators.required],
      last_name: [this.document.last_name || '', Validators.required],
      gender: [this.document.gender || '', Validators.required],
      birthdate: [this.document.birthdate ? new Date(this.document.birthdate).toISOString().split('T')[0] : ''],
      phone_number: [this.document.phone_number || ''],
      role: [this.document.role || 'user', Validators.required],
      country: [this.document.country?._id || this.document.country || ''],
      category: [this.document.category?._id || this.document.category || ''],
      specialty: [this.document.specialty?._id || this.document.specialty || ''],
      skills: [this.document.skills?.map((s: any) => s._id || s) || []],
      aboutMe: [this.document.aboutMe || ''],
      hourlyRate: [this.document.hourlyRate || 0],
      availability: [this.document.availability || 'available'],
      timezone: [this.document.timezone || 'UTC'],
      // Social Links
      linkedin: [this.document.socialLinks?.linkedin || ''],
      github: [this.document.socialLinks?.github || ''],
      portfolio: [this.document.socialLinks?.portfolio || ''],
      twitter: [this.document.socialLinks?.twitter || ''],
      // Verification
      isEmailVerified: [this.document.isEmailVerified !== undefined ? this.document.isEmailVerified : false],
      isPhoneVerified: [this.document.isPhoneVerified !== undefined ? this.document.isPhoneVerified : false],
      isIdentityVerified: [this.document.isIdentityVerified !== undefined ? this.document.isIdentityVerified : false],
      // Activity
      isActive: [this.document.isActive !== undefined ? this.document.isActive : true]
    });

    console.log('Form Values:', this.form.value);
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
    
    // Build payload
    const payload: any = {
      username: formValue.username,
      email: formValue.email,
      first_name: formValue.first_name,
      last_name: formValue.last_name,
      gender: formValue.gender,
      birthdate: formValue.birthdate,
      phone_number: formValue.phone_number,
      role: formValue.role,
      aboutMe: formValue.aboutMe,
      hourlyRate: formValue.hourlyRate,
      availability: formValue.availability,
      timezone: formValue.timezone,
      isActive: formValue.isActive,
      isEmailVerified: formValue.isEmailVerified,
      isPhoneVerified: formValue.isPhoneVerified,
      isIdentityVerified: formValue.isIdentityVerified,
      socialLinks: {
        linkedin: formValue.linkedin,
        github: formValue.github,
        portfolio: formValue.portfolio,
        twitter: formValue.twitter
      }
    };

    // Add password only if provided (for create or password change)
    if (formValue.password) {
      payload.password = formValue.password;
      payload.confirmPassword = formValue.confirmPassword || formValue.password;
    }

    // Add country if selected
    if (formValue.country) {
      payload.country = formValue.country;
    }

    // Add category if selected
    if (formValue.category) {
      payload.category = formValue.category;
    }

    // Add specialty if selected
    if (formValue.specialty) {
      payload.specialty = formValue.specialty;
    }

    // Add skills if selected
    if (formValue.skills && formValue.skills.length > 0) {
      payload.skills = formValue.skills;
    }

    // Add _id for update
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
    if (control?.hasError('email')) {
      return 'Invalid email format';
    }
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Minimum length is ${minLength} characters`;
    }
    return '';
  }

  formatAvailability(value: string): string {
    return value.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
}
