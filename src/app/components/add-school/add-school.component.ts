import { Component, OnInit } from '@angular/core';

import {manageData} from 'src/app/data/manageData'
import { SchoolService } from 'src/app/services/school.service';


@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.scss']
})
export class AddSchoolComponent implements OnInit {

  constructor(
    private manageData : manageData,
    private schoolService:SchoolService) { }

  schoolName = '';

  ngOnInit(): void {
  }

  createSchool(){
    //this.manageData.addSchool(this.schoolName);
    ///////////////////////
    this.schoolService.addSchool(this.schoolName);

    //this.manageData.printItems();
  }

}
