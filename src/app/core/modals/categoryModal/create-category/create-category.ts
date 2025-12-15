import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './create-category.html',
  styleUrl: './create-category.scss',
})
export class CreateCategory {
  @Input() collectionName: string = '';
  @Input() initialData?: any;

  @Output() submit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  categoryForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: [this.initialData?.name || '', [Validators.required, Validators.minLength(2)]],
      description: [this.initialData?.description || ''],
      isActive: [this.initialData?.isActive ?? true, Validators.required],
    });
  }

  onSubmit() {
    if (this.categoryForm.invalid) return;
    // Log the value of isActive
    console.log('isActive:', this.categoryForm.get('isActive')?.value);
    console.log('isActive:',typeof this.categoryForm.get('isActive')?.value);
    this.submit.emit(this.categoryForm.value);
  }

  onCancel() {
    this.cancel.emit();
  }
}
