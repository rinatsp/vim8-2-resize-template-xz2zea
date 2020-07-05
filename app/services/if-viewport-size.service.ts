import { HostListener, Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { ViewportScreens } from '../models/viewport-screens.model';
import { APP_CONFIG } from '../configs/app.config';
import {IConfig} from "../models/config.model";

@Injectable({
  providedIn: 'root',
})
export class IfViewportSizeService implements OnDestroy {

  constructor(@Inject(APP_CONFIG) config: IConfig) {
    this.viewportScreenType = this.newWidth.pipe(
      distinctUntilChanged(),
      map((viewportWidth: number) => {
        const { medium, large } = config;
        return (
          (viewportWidth < medium && ViewportScreens.small) ||
          (medium <= viewportWidth &&
            viewportWidth < large &&
            ViewportScreens.medium) ||
          (large <= viewportWidth && ViewportScreens.large)
        );
      }),
      takeUntil(this.ngUnsubscribe)
    );
  }
  private ngUnsubscribe: Subject<void> = new Subject();

  newWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

  viewportScreenType: Observable<string>;

  @HostListener('window:resize', ['$event'])
  changeWindowSize(event) {
    console.log(event.target.innerWidth);
    this.setViewportSize(event.target.innerWidth);
  }

  setViewportSize(viewportWidth: number) {
    if (viewportWidth !== this.getViewportSize()) {
      this.newWidth.next(viewportWidth);
    }
  }

  getViewportSize(): number {
    return this.newWidth.getValue();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
