import { Component, OnInit } from '@angular/core';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-edit-school',
  templateUrl: './edit-school.component.html',
  styleUrls: ['./edit-school.component.scss']
})
export class EditSchoolComponent implements OnInit {

  newSchool = '';
  constructor(private schoolService:SchoolService) { }

  ngOnInit(): void {
  }

  editSchool(){
    this.schoolService.editSchool(this.schoolService.clickedSchool,this.newSchool);
  }

}
