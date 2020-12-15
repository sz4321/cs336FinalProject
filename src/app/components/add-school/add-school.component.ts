import { Component, OnInit } from '@angular/core';

import { SchoolService } from 'src/app/services/school.service';


@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.scss']
})
export class AddSchoolComponent implements OnInit {

  constructor(private schoolService:SchoolService) { }

  schoolName = '';

  ngOnInit(): void {
  }

  // When save is clicked, the school name is entered to the database
  createSchool(){
    this.schoolService.addSchool(this.schoolName);
  }

}
