import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddSchoolComponent } from '../add-school/add-school.component';
import { ToDoListComponent } from '../to-do-list/to-do-list.component';
import { LogInComponent } from '../log-in/log-in.component';
import {manageData} from 'src/app/data/manageData'





@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private router:Router,
    public dialog: MatDialog,
    private manageData:manageData) { }

  //the list of the name of the schools
  schoolName = this.manageData.getData();

  ngOnInit(): void {
  }

  openSchool(schoolSelected){
    console.log("open school has been clicked");
    this.manageData.setCurrentSchool(schoolSelected);
    this.router.navigate(['/to-do-list']);
    console.log(schoolSelected);

  }

  addschool(){
    this.dialog.open(AddSchoolComponent);

  }
}
