import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddSchoolComponent } from '../add-school/add-school.component';
import { ToDoListComponent } from '../to-do-list/to-do-list.component';
import { LogInComponent } from '../log-in/log-in.component';
import {manageData} from 'src/app/data/manageData'
import { SchoolService } from 'src/app/services/school.service';
import { EditSchoolComponent } from '../edit-school/edit-school.component';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {School} from 'src/app/services/school.service';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private router:Router,
    public dialog: MatDialog,
    private manageData:manageData,
    private schoolService:SchoolService,
    private firestore: AngularFirestore) { }


  // get the name of the schools in the database
  schoolName = this.schoolService.getSchools();

  //get the changes in the database 
  async ngOnInit() {
    this.firestore.collection<School>('/SchoolList').valueChanges().subscribe((i)=>{
      let schoolsList;
      schoolsList = i;
      this.schoolService.setSchools(schoolsList);
      this.schoolName = this.schoolService.getSchools();
    })
  }


  //when a school is selected, save the name of the clicked school and open the to do list page 
  // save then name of the school in the service and the session storage so it can be claimed when the page is refreshed 
  openSchool(schoolSelected){
    this.schoolService.setCurrentSchool(schoolSelected);
    sessionStorage.setItem('schoolSelected', schoolSelected);
    this.router.navigate(['/to-do-list']);
  }

  //when add school is clicked, open the add school component 
  addschool(){
    this.dialog.open(AddSchoolComponent);

  }

  //delete the school with the given name 
  deleteSchool(schoolName){
    this.schoolService.deleteSchool(schoolName);
  }

  //save the name of the clicked school and open the edit school component 
  editSchool(schoolName){
    this.schoolService.clickedSchool = schoolName;
    this.dialog.open(EditSchoolComponent);
  }
}
