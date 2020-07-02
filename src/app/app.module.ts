import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { LocationComponent } from './components/location/location.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { EditLocationComponent } from './components/edit-location/edit-location.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AdminComponent,
    PageNotFoundComponent,
    LoginComponent,
    LocationComponent,
    AddLocationComponent,
    EditLocationComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    LeafletModule,
    NgbModalModule,
    LeafletMarkerClusterModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
