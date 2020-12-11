import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import {manageData} from 'src/app/data/manageData'
import { ToDoListComponent } from '../to-do-list/to-do-list.component';
import { MatDialog } from '@angular/material/dialog';
import { SchoolService } from 'src/app/services/school.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';




@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(private manageData : manageData,
    public dialog: MatDialog,
    private schoolService:SchoolService,
    private router:Router,
    @Inject(DOCUMENT) private _document: Document) { }

  
  enteredTask = '';

  ngOnInit(): void {
    
  }

  enterTask(){
    //let currentSchool = this.manageData.getCurrentSchool();
    let currentSchool = this.schoolService.getCurrentSchool();

    //this.enteredTask === '' ? this.enteredTask = '' : this.manageData.addTask(currentSchool, this.enteredTask);
    this.enteredTask === '' ? this.enteredTask = '' : this.schoolService.addTask(currentSchool, this.enteredTask);

    this.router.navigate(['/to-do-list']);
    //this.manageData.addTask(currentSchool, this.enteredTask);
    // console.log(this.enteredTask);
    // console.log("tasks", this.manageData.getTasksForSchool(currentSchool));
    // this.dialog.closeAll();
  }
}
