import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';

// reducers
import { BackgroundReducer } from './reducers/background';

// components
import { IndexComponent } from './components/index/index.component';
import { BackgroundMangerComponent } from './components/background-manger/background-manger.component';
import { WorksItemsComponent } from './components/works-items/works-items.component';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/authorization/register/register.component';
import { LoginComponent } from './components/authorization/login/login.component';
import { ConvertMultiFilesToBase64Component } from './components/convert-multi-files-to-base64/convert-multi-files-to-base64.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    BackgroundMangerComponent,
    WorksItemsComponent,
    LandingComponent,
    RegisterComponent,
    LoginComponent,
    ConvertMultiFilesToBase64Component
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ backgroundColor: BackgroundReducer }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
