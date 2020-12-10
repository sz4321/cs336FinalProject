import { Component, Input, OnInit } from '@angular/core';
import { manageData } from 'src/app/data/manageData';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';


@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {

  listOfTask = this.manageData.getTasksForSchool(this.manageData.getCurrentSchool());
  constructor(private manageData:manageData,
    public dialog: MatDialog) { }
    
  ngOnInit(): void {
  }

  addtask(){
    this.dialog.open(AddTaskComponent);
  }

  OnChange($event, givenTask){
    if($event.checked == true){
      this.manageData.check(this.manageData.getCurrentSchool(),givenTask);
    }
    else if($event.checked == false){
      this.manageData.uncheck(this.manageData.getCurrentSchool(),givenTask);
    }
  }

  deleteTask(task){
    this.manageData.deleteGivenTask(this.manageData.getCurrentSchool(),task);
    console.log("task", task);
  }

  editTask(givenTask){
    this.manageData.clickedTask = givenTask;
    this.dialog.open(EditTaskComponent);
  }

  // updateTaskList(){
  //   let currentSchool :string = ;
  //   this.listOfTask = this.manageData.getTasksForSchool(this.manageData.getCurrentSchool());
  //   this.manageData.printItems();
  // }

  
}
