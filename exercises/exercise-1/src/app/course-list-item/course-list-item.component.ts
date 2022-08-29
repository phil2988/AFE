import { Component, Input, OnInit } from '@angular/core';
import { CourseModel } from 'projects/models/src/lib/models.interfaces';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.css']
})
export class CourseListItemComponent implements OnInit {

  @Input()
  _course!: CourseModel;

  constructor() {
  }

  ngOnInit(): void {
  }

}
