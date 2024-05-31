import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BikeListComponent } from './pages/bike-list/bike-list.component';
import { ManufacturerListComponent } from './pages/manufacturer-list/manufacturer-list.component';
import { appCanActivate } from './guard/app.auth.guard';
import { AppRoles } from '../app.roles';
import { ManufacturerEditComponent } from './pages/manufacturer-edit/manufacturer-edit.component';
import { BikeEditComponent } from './pages/bike-edit/bike-edit.component';
import { BikeInfoComponent } from './pages/bike-info/bike-info.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ExpenseEditComponent } from './pages/expense-edit/expense-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'bike',
    component: BikeListComponent,
    pathMatch: 'full',
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.Admin, AppRoles.User] },
  },
  {
    path: 'bike/info/:id',
    component: BikeInfoComponent,
    pathMatch: 'full',
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.Admin, AppRoles.User] },
  },
  {
    path: 'bike/create',
    component: BikeEditComponent,
    pathMatch: 'full',
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.Admin, AppRoles.User] },
  },
  {
    path: 'bike/edit/:id',
    component: BikeEditComponent,
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
  {
    path: 'expense/create/:id',
    component: ExpenseEditComponent,
    pathMatch: 'full',
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.User, AppRoles.Admin] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
