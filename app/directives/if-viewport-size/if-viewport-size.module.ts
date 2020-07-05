import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IfViewportSizeDirective } from './if-viewport-size.directive';
import { IfViewportSizeService } from '../../services/if-viewport-size.service';

@NgModule({
  declarations: [IfViewportSizeDirective],
  exports: [IfViewportSizeDirective],
  imports: [CommonModule],
  providers: [IfViewportSizeService]
})
export class IfViewportSizeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: IfViewportSizeModule,
    };
  }
}
