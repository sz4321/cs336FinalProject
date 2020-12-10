import { Component, OnInit } from '@angular/core';

import {manageData} from 'src/app/data/manageData'


@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.scss']
})
export class AddSchoolComponent implements OnInit {

  constructor(
    private manageData : manageData) { }

  schoolName = '';

  ngOnInit(): void {
  }

  createSchool(){
    this.manageData.addSchool(this.schoolName);
    console.log("create school clicked");

    this.manageData.printItems();
  }

}
