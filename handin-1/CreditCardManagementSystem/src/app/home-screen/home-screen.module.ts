import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    MatPaginatorModule
  ]
})
export class HomeScreenModule { }
