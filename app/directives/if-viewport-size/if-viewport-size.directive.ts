import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { IfViewportSizeService } from '../../services/if-viewport-size.service';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[ifViewportSize]',
})
export class IfViewportSizeDirective implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject();
  viewportScreen: string;

  @Input()
  set ifViewportSize(value: string) {
    this.viewContainerRef.clear();
    this.viewportScreen = value;
  }
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private ifViewportSizeService: IfViewportSizeService
  ) {}

  ngOnInit(): void {
    this.ifViewportSizeService.viewportScreenType
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((viewPortScreen: string) => {
        this.viewContainerRef.clear();

        if (this.viewportScreen === viewPortScreen) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      });
  }
}
