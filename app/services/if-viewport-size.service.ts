import {
  Inject,
  Injectable,
  OnDestroy,
} from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, map, takeUntil} from 'rxjs/operators';
import { APP_CONFIG } from '../configs/app.config';
import { IConfig } from '../models/config.model';

@Injectable()
export class IfViewportSizeService implements OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject();

  newWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

  viewportScreenType: Observable<string>;

  constructor(
    @Inject(APP_CONFIG) config: IConfig
  ) {
    fromEvent(window, 'resize')
      .pipe(
        map(() => window.innerWidth),
        debounceTime(400),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((width: number) => {
        console.log('sdd');
        this.setViewportSize(width);
      });
    this.viewportScreenType = this.newWidth.pipe(
      distinctUntilChanged(),
      map((viewportWidth: number) => {
        const { medium, large } = config;
        return (
          (viewportWidth < medium && 'small') ||
          (medium <= viewportWidth && viewportWidth < large && 'medium') ||
          (large <= viewportWidth && 'large')
        );
      }),
      takeUntil(this.ngUnsubscribe)
    );
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
