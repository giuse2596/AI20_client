import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { StudentsComponent } from './teacher/students.component';
import { StudentsContComponent } from './teacher/students-cont.component';
import { AppRoutingModule } from './app-routing-module';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { VmsContComponent} from './teacher/vms-cont.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from './auth/login-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentsContComponent,
    HomeComponent,
    PageNotFoundComponent,
    VmsContComponent,
    LoginDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    LoginDialogComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }