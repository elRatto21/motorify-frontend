import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BikeListComponent } from './pages/bike-list/bike-list.component';
import { ManufacturerListComponent } from './pages/manufacturer-list/manufacturer-list.component';
import { AppLoginComponent } from './pages/app-login/app-login.component';
import { appCanActivate } from './guard/app.auth.guard';
import { AppRoles } from '../app.roles';
import { ManufacturerEditComponent } from './pages/manufacturer-edit/manufacturer-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AppLoginComponent,
  },
  {
    path: 'bike',
    component: BikeListComponent,
    pathMatch: 'full',
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.Admin, AppRoles.User] },
  },
  {
    path: 'manufacturer',
    component: ManufacturerListComponent,
    pathMatch: 'full',
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.Admin, AppRoles.User] },
  },
  {
    path: 'manufacturer/create',
    component: ManufacturerEditComponent,
    pathMatch: 'full',
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.Admin] },
  },
  {
    path: 'manufacturer/edit/:id',
    component: ManufacturerEditComponent,
    pathMatch: 'full',
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.Admin] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
