/** ANGULAR */
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/** COMPONENTS */
import { AccessControlComponent } from './access-control.component';
import { BarcodeScannerComponent } from './barcodeScanner/barcodeScanner.component';

/** LIBRARIES */
import { CustomComponentsModule } from 'custom-components';

@NgModule({
  declarations: [
    AccessControlComponent,
    BarcodeScannerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CustomComponentsModule
  ],
  exports: [
    AccessControlComponent,
    BarcodeScannerComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccessControlModule { }
