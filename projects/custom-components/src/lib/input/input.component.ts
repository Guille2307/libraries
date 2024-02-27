/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'custom-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class CustomInputComponent implements OnInit {

  @Input() type = 'text';
  @Input() class = 'input';
  @Input() disabled = false;
  @Input() iconLeft = '';
  @Input() iconRight = '';
  @Input() placeholder = '';

  form: FormGroup = this.fb.group({
    input: ['', [Validators.required]]
  });

  @Output() sendEvent = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {}

  sendValue() {
    if (this.form.valid) {
      this.sendEvent.emit(this.form.value.input);
    }
  }
}
