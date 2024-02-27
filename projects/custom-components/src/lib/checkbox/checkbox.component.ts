import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'custom-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CustomCheckboxComponent implements OnInit {

  selected = false;
  @Output() sendEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onChange(ev) {
    this.selected = !this.selected;
    this.sendEvent.emit(this.selected);
  }
}
