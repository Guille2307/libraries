import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'custom-transparent-button',
  templateUrl: './transparentButton.component.html',
  styleUrls: ['./transparentButton.component.scss'],
})
export class CustomTransparentButtonComponent implements OnInit {

  @Input() type = 'button';
  @Input() class = 'button';
  @Input() short = false;
  @Input() disabled = false;
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
