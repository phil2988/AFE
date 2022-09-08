import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HomePageComponent } from './home-page/home-page.component';
import { HomePageService } from './home-page/home-page.service';

@NgModule({
  declarations: [
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,

    MatSortModule,
    MatTableModule,
  ],
  providers: [HomePageService]
})
export class HomeScreenModule { }
