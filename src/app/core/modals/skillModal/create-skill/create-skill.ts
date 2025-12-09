import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-skill',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-skill.html',
  styleUrl: './create-skill.scss',
})
export class CreateSkill {
  @Input() collectionName: string = '';
  @Input() dropdownOptions: any[] = []; // e.g., specialties [{_id, name}]
  @Input() initialData?: any;

  @Output() submit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  skillForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.skillForm = this.fb.group({
      name: [this.initialData?.name || '', [Validators.required, Validators.minLength(2)]],
      specialty: [this.initialData?.specialty || '', Validators.required]
    });
  }

  onSubmit() {
    if (this.skillForm.invalid) return;
    this.submit.emit(this.skillForm.value);
  }

  onCancel() {
    this.cancel.emit();
  }
}
