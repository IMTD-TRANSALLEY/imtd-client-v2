import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { LocationComponent } from './components/location/location.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { EditLocationComponent } from './components/edit-location/edit-location.component';
import { MapComponent } from './components/map/map.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'carte', component: MapComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'locations/:id', component: LocationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  {
    path: 'admin/add-location',
    component: AddLocationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/edit-location/:id',
    component: EditLocationComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
