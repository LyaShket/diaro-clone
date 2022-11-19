import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {QuillConfigModule, QuillModule} from "ngx-quill";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from './pages/home/home.component';
import {DiaryEntryComponent} from './pages/diary-entry/diary-entry.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {FooterComponent} from './components/footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {LoginModalComponent} from './shared/modals/login-modal/login-modal.component';
import {SignupModalComponent} from './shared/modals/signup-modal/signup-modal.component';
import {NgxContentLoadingModule} from "ngx-content-loading";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DiaryEntryComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoginModalComponent,
    SignupModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule.forRoot(),
    NgxContentLoadingModule,
    NgSelectModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {
}
