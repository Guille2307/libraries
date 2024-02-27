import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'custom-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class CustomButtonComponent implements OnInit {

  @Input() type = 'button';
  @Input() class = 'button';
  @Input() short = false;
  @Input() disabled = false;
  @Input() half = false;
  @Input() iconLeft = '';
  @Input() iconRight = '';
  @Input() translation = '';

  @Output() onClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  click(ev) {
    this.onClick.emit(ev);
  }
}
