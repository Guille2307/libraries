/** ANGULAR */
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomComponentsComponent } from './custom-components.component';

/** COMPONENTS */
import { CustomInputComponent } from './input/input.component';
import { CustomButtonComponent } from './button/button.component';
import { CustomContextmenuComponent } from './contextmenu/contextmenu.component';
import { CustomCheckboxComponent } from './checkbox/checkbox.component';
import { CustomTransparentButtonComponent } from './transparentButton/transparentButton.component';

@NgModule({
  declarations: [
    CustomComponentsComponent,
    CustomInputComponent,
    CustomButtonComponent,
    CustomContextmenuComponent,
    CustomCheckboxComponent,
    CustomTransparentButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    CustomComponentsComponent,
    CustomInputComponent,
    CustomButtonComponent,
    CustomContextmenuComponent,
    CustomCheckboxComponent,
    CustomTransparentButtonComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomComponentsModule { }
