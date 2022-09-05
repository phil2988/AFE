import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  service: NavigationService;

  constructor(service: NavigationService) {
    this.service = service;
   }

  ngOnInit(): void {
  }  
}
