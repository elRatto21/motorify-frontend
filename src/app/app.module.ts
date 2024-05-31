import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BikeListComponent } from './pages/bike-list/bike-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import { ManufacturerListComponent } from './pages/manufacturer-list/manufacturer-list.component';
import { MatTableModule } from '@angular/material/table';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClientXsrfModule,
} from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AuthConfig, OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppAuthService } from './service/app.auth.service';
import { HttpXSRFInterceptor } from './interceptors/http.csrf.interceptor';
import { IsInRoleDirective } from './dir/is.in.role.dir';
import { IsInRolesDirective } from './dir/is.in.roles.dir';
import { ManufacturerEditComponent } from './pages/manufacturer-edit/manufacturer-edit.component';
import {
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatLabel,
} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { BikeEditComponent } from './pages/bike-edit/bike-edit.component';
import { MatSelectModule } from '@angular/material/select';
import { BikeInfoComponent } from './pages/bike-info/bike-info.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShortcutComponent } from './components/shortcut/shortcut.component';
import {MatCardModule} from '@angular/material/card';
import { MaintenanceListComponent } from './components/maintenance-list/maintenance-list.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseEditComponent } from './pages/expense-edit/expense-edit.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MaintenanceEditComponent } from './pages/maintenance-edit/maintenance-edit.component';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/motorify',
  requireHttps: false,
  redirectUri: 'http://localhost:4200',
  postLogoutRedirectUri: 'http://localhost:4200',
  clientId: 'motorify',
  scope: 'openid profile roles offline_access',
  responseType: 'code',
  showDebugInformation: true,
  requestAccessToken: true,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  silentRefreshTimeout: 500,
  clearHashAfterLogin: true,
};

export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

@NgModule({
  declarations: [
    AppComponent,
    BikeListComponent,
    IsInRoleDirective,
    IsInRolesDirective,
    NavbarComponent,
    ManufacturerListComponent,
    LoginComponent,
    ManufacturerEditComponent,
    BikeEditComponent,
    BikeInfoComponent,
    DashboardComponent,
    ShortcutComponent,
    MaintenanceListComponent,
    ExpenseListComponent,
    ExpenseEditComponent,
    MaintenanceEditComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatButton,
    MatMenu,
    MatMenuItem,
    MatMenuModule,
    MatTableModule,
    MatToolbar,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatLabel,
    MatSelectModule,
    MatHint,
    MatDatepickerModule,
    MatSortModule,
    OAuthModule.forRoot({ resourceServer: { sendAccessToken: true } }),
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    { provide: AuthConfig, useValue: authConfig },
    { provide: HTTP_INTERCEPTORS, useClass: HttpXSRFInterceptor, multi: true },
    {
      provide: OAuthStorage,
      useFactory: storageFactory,
    },
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(authService: AppAuthService) {
    authService.initAuth().finally();
  }
}
