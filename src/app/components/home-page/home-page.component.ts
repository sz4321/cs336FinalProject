import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddSchoolComponent } from '../add-school/add-school.component';
import { ToDoListComponent } from '../to-do-list/to-do-list.component';
import { LogInComponent } from '../log-in/log-in.component';
import {manageData} from 'src/app/data/manageData'
import { SchoolService } from 'src/app/services/school.service';
import { EditSchoolComponent } from '../edit-school/edit-school.component';





@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private router:Router,
    public dialog: MatDialog,
    private manageData:manageData,
    private schoolService:SchoolService) { }

  //the list of the name of the schools
  // schoolName = this.manageData.getData();
  schoolName = this.schoolService.getSchools();

  ngOnInit(): void {
  }

  openSchool(schoolSelected){
    this.schoolService.setCurrentSchool(schoolSelected);
    this.router.navigate(['/to-do-list']);

  }

  addschool(){
    this.dialog.open(AddSchoolComponent);

  }

  deleteSchool(schoolName){
    this.schoolService.deleteSchool(schoolName);
  }

  editSchool(schoolName){
    this.schoolService.clickedSchool = schoolName;
    this.dialog.open(EditSchoolComponent);
  }
}
