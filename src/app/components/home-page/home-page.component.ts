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

  //the list of the name of the schools
  // schoolName = this.manageData.getData();
  schoolName = this.schoolService.getSchools();

  async ngOnInit() {
    this.firestore.collection<School>('/SchoolList').valueChanges().subscribe((i)=>{
      let schoolsList;
      schoolsList = i;
      this.schoolService.setSchools(schoolsList);
      this.schoolName = this.schoolService.getSchools();
    })
  }

  // ngOnInit(){

  // }

  openSchool(schoolSelected){
    this.schoolService.setCurrentSchool(schoolSelected);
    sessionStorage.setItem('schoolSelected', schoolSelected);
    this.router.navigate(['/to-do-list']);
  }

  addschool(){
    // console.log(this.schoolService.schools);
    // console.log('schools', this.schoolName);
    this.dialog.open(AddSchoolComponent);

  }

  deleteSchool(schoolName){
    this.schoolService.deleteSchool(schoolName);
  }

  editSchool(schoolName){
    this.schoolService.clickedSchool = schoolName;
    //sessionStorage.setItem('ClickedSchool', schoolName);
    // this.schoolService.currentSchool = schoolName;
    this.dialog.open(EditSchoolComponent);
  }
}
