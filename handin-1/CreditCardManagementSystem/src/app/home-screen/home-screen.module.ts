import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeListComponent } from './home-list/home-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path: '', component: HomePageComponent}]

@NgModule({
  declarations: [
    HomePageComponent,
    HomeListComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    MatPaginatorModule
  ]
})
export class HomeScreenModule { }
