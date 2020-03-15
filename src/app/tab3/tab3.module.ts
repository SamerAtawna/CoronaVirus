import { IonicModule } from '@ionic/angular';

import { RouterModule } from '@angular/router';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Tab1Page } from '../tab1/tab1.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    NgxDatatableModule
  ],
  declarations: [Tab3Page],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [Tab1Page]
})
export class Tab3PageModule {}
