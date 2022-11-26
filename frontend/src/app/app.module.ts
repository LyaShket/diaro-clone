import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { QuillConfigModule, QuillModule } from "ngx-quill";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './pages/home/home.component';
import { DiaryEntryComponent } from './pages/diary-entry/diary-entry.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginModalComponent } from './shared/modals/login-modal/login-modal.component';
import { SignupModalComponent } from './shared/modals/signup-modal/signup-modal.component';
import { NgxContentLoadingModule } from "ngx-content-loading";
import { GuidedTourModule, GuidedTourService } from "ngx-guided-tour";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material/core";
import { EntryPreviewComponent } from './pages/diary-entry/entry-preview/entry-preview.component';
import { EntryFormComponent } from './pages/diary-entry/entry-form/entry-form.component';
import { EntryViewComponent } from './pages/diary-entry/entry-view/entry-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DiaryEntryComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoginModalComponent,
    SignupModalComponent,
    EntryPreviewComponent,
    EntryFormComponent,
    EntryViewComponent
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
    MatButtonModule,
    GuidedTourModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule
  ],
  providers: [
    GuidedTourService
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {
}
