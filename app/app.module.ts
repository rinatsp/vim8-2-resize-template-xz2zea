import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TestComponent } from './test.component';
import { APP_CONFIG, Config } from './configs/app.config';
import { IfViewportSizeModule } from './directives/if-viewport-size/if-viewport-size.module';

@NgModule({
  imports: [BrowserModule, FormsModule, IfViewportSizeModule.forRoot()],
  declarations: [AppComponent, HelloComponent, TestComponent],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: Config,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
