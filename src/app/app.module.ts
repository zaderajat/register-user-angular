import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { HomepageComponent } from './component/homepage/homepage.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegistrationFormComponent } from './component/registration-form/registration-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import { HeaderComponent } from './component/header/header.component';
import { ProfileComponent } from './component/profile/profile.component';
import {MatSelectModule} from '@angular/material/select';
import { FooterComponent } from './component/footer/footer.component';
import { MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { EditDialogComponent } from './component/edit-dialog/edit-dialog.component';
import {MatCardModule} from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RegistrationFormComponent,
    HeaderComponent,
    ProfileComponent,
    FooterComponent,
    EditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSliderModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  entryComponents: [RegistrationFormComponent,EditDialogComponent
    
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
