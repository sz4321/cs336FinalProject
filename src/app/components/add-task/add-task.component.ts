import { Component, Input, OnInit, Output } from '@angular/core';
import {manageData} from 'src/app/data/manageData'
import { ToDoListComponent } from '../to-do-list/to-do-list.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(private manageData : manageData,
    public dialog: MatDialog) { }
  enteredTask = '';
  currenttask = [];

  ngOnInit(): void {
  }

  enterTask(){
    let currentSchool = this.manageData.getCurrentSchool();
    
    this.enteredTask === '' ? this.enteredTask = '' : this.manageData.addTask(currentSchool, this.enteredTask);

    //this.manageData.addTask(currentSchool, this.enteredTask);
    console.log(this.enteredTask);
    console.log("tasks", this.manageData.getTasksForSchool(currentSchool));
    // this.dialog.closeAll();
  }
}
