import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { AccessControlService } from '../public-api';

@Component({
  selector: 'access-control',
  templateUrl: './access-control.component.html',
  styleUrls: ['./access-control.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccessControlComponent implements OnInit {

  @Input() showCont = true;
  @Input() showCam = false;
  @Input() contAssistants = '00000';
  @Input() translations?;
  @Input() cashless = false;
  @Input() camEnabled = false;

  @Input() object?;

  @Output() goToCapacity = new EventEmitter<any>();
  @Output() getCount = new EventEmitter<any>();
  @Output() sendCode = new EventEmitter<any>();

  codeRead = false;
  showSearchInput = false;
  inputUsed = false;

  constructor(
    private accessControlSvc: AccessControlService
  ) { }

  ngOnInit(): void {}

  openCam() {
    this.showCam = !this.showCam;
  }

  receiveCode(ev) {
    this.inputUsed = false;
    this.showCam = false;
    this.codeRead = true;
    this.sendCode.emit(ev);
    setTimeout(() => {
      if (!this.showCam && this.codeRead && !this.showSearchInput) {
        this.codeRead = false;
        this.showCam = true;
      }
    }, 3000);
  }

  receiveCodeInput(ev) {
    this.inputUsed = true;
    this.codeRead = true;
    this.sendCode.emit(ev);
    setTimeout(() => {
      if (this.codeRead && !this.showSearchInput) {
        this.codeRead = false;
        this.showSearchInput = true;
      }
    }, 3000);
  }

  toggleShowInput() {
    this.showSearchInput = !this.showSearchInput;
    this.showCam = false;
  }

  toggleShowCam() {
    // if (this.showCam) {
    //   this.camEnabled = true;
    // }
    this.showCam = !this.showCam;
  }

  nextCode() {
    this.codeRead = !this.codeRead;
    if (this.inputUsed) {
      this.showSearchInput = true;
    } else {
      this.showCam = true;
    }
  }
}
