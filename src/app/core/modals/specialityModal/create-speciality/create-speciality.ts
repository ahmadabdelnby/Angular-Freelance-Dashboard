import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-speciality',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-speciality.html',
  styleUrl: './create-speciality.scss',
})
export class CreateSpeciality {
  @Input() collectionName: string = '';
  @Input() dropdownOptions: any[] = []; // e.g., categories [{_id, name}]
  @Input() initialData?: any;

  @Output() submit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  specialityForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.specialityForm = this.fb.group({
      name: [this.initialData?.name || '', [Validators.required, Validators.minLength(2)]],
      description: [this.initialData?.description || ''],
      isActive: [this.initialData?.isActive ?? true, Validators.required],
      category: [this.initialData?.category?.toString() || '', Validators.required]

    });
  }

  onSubmit() {
  if (this.specialityForm.invalid) return;

  const formValue = this.specialityForm.value;

  // Map 'category' to 'Category' for backend
  const payload = {
    ...formValue,
    Category: formValue.category,  // note uppercase
    category: undefined            // optional: remove lowercase
  };

  this.submit.emit(payload);
}


  onCancel() {
    this.cancel.emit();
  }
}
