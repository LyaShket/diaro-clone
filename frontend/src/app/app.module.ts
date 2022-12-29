import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
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
import { EntryPreviewComponent } from './shared/components/entry-preview/entry-preview.component';
import { EntryFormComponent } from './pages/diary-entry/entry-form/entry-form.component';
import { EntryViewComponent } from './shared/components/entry-view/entry-view.component';
import { EntryListComponent } from './pages/home/entry-list/entry-list.component';
import { EntryListPreviewComponent } from './pages/home/entry-list-preview/entry-list-preview.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from "./shared/interceptors/auth.interceptor";
import { NgxsModule } from '@ngxs/store';
import { EntryState } from './store/states/entry.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { CategoryState } from './store/states/category.state';
import { TagState } from './store/states/tag.state';
import { SearchState } from './store/states/search.state';
import { AuthState } from './store/states/auth.state';
import { SearchFormComponent } from './components/sidebar/search-form/search-form.component';
import { UserInfoComponent } from './components/sidebar/user-info/user-info.component';
import { EntryActionsComponent } from './pages/diary-entry/entry-actions/entry-actions.component';
import { PublicDiaryEntryComponent } from './pages/public-diary-entry/public-diary-entry.component';

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
    EntryViewComponent,
    EntryListComponent,
    EntryListPreviewComponent,
    SearchFormComponent,
    UserInfoComponent,
    EntryActionsComponent,
    PublicDiaryEntryComponent,
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
    MatFormFieldModule,
    ToastrModule.forRoot(),
    NgxsModule.forRoot([EntryState, SearchState, CategoryState, TagState, AuthState], {
      developmentMode: true
    }),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [
    GuidedTourService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {
}
