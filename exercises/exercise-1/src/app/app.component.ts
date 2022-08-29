import { Component } from '@angular/core';
import { CourseModel } from '../../projects/models/src/lib/models.interfaces';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { CourseModule } from './course/course.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  courses: CourseModel[] = [
    {
      code: "AFE",
      ects: 5,
      name: "Advanced Front End"
    },
    {
      code: "APC",
      ects: 10,
      name: "Advanced programming concepts"
    },
    {
      code: "NHC",
      ects: 20,
      name: "No Homework Course"
    }
  ]

  title = 'exercise-1';
}
