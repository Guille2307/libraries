/** ANGULAR */
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/** COMPONENTS */
import { AgendaComponent } from './agenda.component';
import { AgendaCardComponent } from './agendaCard/agendaCard.component';

/** LIBRARIES */
import { CustomComponentsModule } from 'custom-components';

/** PIPES */
import { FilterPipe } from '../pipes/filter/filter.pipe';
import { FilterWithStartsPipe } from '../pipes/filterWithStarts/filterWithStarts.pipe';
import { ImageSchedulePipe } from '../pipes/imageSchedule/imageSchedule.pipe';

/** MATERIAL COMPONENTS */
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AgendaComponent,
    AgendaCardComponent,
    FilterPipe,
    FilterWithStartsPipe,
    ImageSchedulePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTabsModule,
    MatButtonModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    CustomComponentsModule
  ],
  exports: [
    AgendaComponent,
    AgendaCardComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AgendaModule { }
