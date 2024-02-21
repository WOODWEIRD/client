import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { errorrInterceptor } from './_interceptor/errorr.interceptor';
import { jwtInterceptor } from './_interceptor/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideClientHydration(),
  provideHttpClient(withInterceptors(
    [errorrInterceptor, jwtInterceptor]
  )),
    BrowserAnimationsModule,
  provideToastr({ positionClass: 'toast-bottom-right' }),
  provideAnimations(),
  ]
};
