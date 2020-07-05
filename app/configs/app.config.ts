import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken<IConfig>('APP_CONFIG');

export const Config: IConfig = {
  medium: 768,
  large: 992,
};
