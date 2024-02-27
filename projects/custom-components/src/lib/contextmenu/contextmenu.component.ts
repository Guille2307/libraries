import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'custom-contextmenu',
  templateUrl: './contextmenu.component.html',
  styleUrls: ['./contextmenu.component.scss']
})
export class CustomContextmenuComponent implements OnInit {

  @Input() contextmenuOptions = [];

  constructor(
    private popover: PopoverController
  ) { }

  ngOnInit() {}


  selectOption(option) {
    this.popover.dismiss({option});
  }
}
