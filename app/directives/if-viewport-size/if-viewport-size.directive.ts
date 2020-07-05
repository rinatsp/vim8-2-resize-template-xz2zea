import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ViewportScreens } from '../../models/viewport-screens.model';
import { IfViewportSizeService } from '../../services/if-viewport-size.service';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[ifViewportSize]',
})
export class IfViewportSizeDirective implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject();
  viewportScreen: ViewportScreens;

  @Input()
  set ifViewportSize(value: ViewportScreens) {
    this.viewContainerRef.clear();
    this.viewportScreen = value;
  }
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private ifViewportSizeService: IfViewportSizeService
  ) {}

  ngOnInit(): void {
    this.ifViewportSizeService.viewportScreenType
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((viewPortScreen: ViewportScreens) => {
        this.viewContainerRef.clear();

        if (this.viewportScreen === viewPortScreen) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      });
  }
}
