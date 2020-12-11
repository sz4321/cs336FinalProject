import { Component, Inject, Input, OnInit } from '@angular/core';
import { manageData } from 'src/app/data/manageData';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { SchoolService } from 'src/app/services/school.service';
import { DOCUMENT } from '@angular/common';
import { observable, Observable } from 'rxjs';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {

  clickedSchool = this.schoolService.getCurrentSchool();
  listOfTask = this.schoolService.getTasksForSchool(this.schoolService.getCurrentSchool()); 
  buttonCliked = false;
  currentTask = '';
  // listOfTask = this.schoolService.getSchoolTask();

  constructor(private manageData:manageData,
    public dialog: MatDialog,
    private schoolService : SchoolService) {
     }


  
  // listOfTask = this.schoolService.getTasksForSchool(this.schoolService.getCurrentSchool());
    // listOfTask = this.schoolService.testFunction(this.schoolService.getCurrentSchool());
  // listOfTask = this.schoolService.currentTasks.su

  ngOnInit(): void {
    console.log('here');
    // this.listOfTask = this.schoolService.getTasksForSchool(this.schoolService.getCurrentSchool());
    
  }

  enterTask(){
    this.currentTask === '' ? this.currentTask = '' : this.schoolService.addTask(this.schoolService.getCurrentSchool(), this.currentTask);
    this.listOfTask = this.schoolService.getTasksForSchool(this.schoolService.getCurrentSchool());
    console.log(this.listOfTask);
    this.buttonCliked = false;
    this.currentTask = '';
  }


  addtask(){
    // this.listOfTask = this.schoolService.getTasksForSchool(this.schoolService.getCurrentSchool());
    // this.dialog.open(AddTaskComponent);
    // console.log('add task', this.listOfTask);
    this.buttonCliked = true;

    // this.listOfTask = this.schoolService.getTasksForSchool(this.schoolService.getCurrentSchool());
  }

  OnChange($event, givenTask){
    /////////////
    // this.schoolService.isChecked(this.manageData.getCurrentSchool(),givenTask);
    // if($event.checked == true){
    //   this.manageData.check(this.manageData.getCurrentSchool(),givenTask);
    // }
    // else if($event.checked == false){
    //   this.manageData.uncheck(this.manageData.getCurrentSchool(),givenTask);
    // }

    if($event.checked == true){
      this.schoolService.check(this.schoolService.getCurrentSchool(),givenTask);
    }
    else if($event.checked == false){
      this.schoolService.uncheck(this.schoolService.getCurrentSchool(),givenTask);
    }
  }

  deleteTask(task){
    // this.manageData.deleteGivenTask(this.manageData.getCurrentSchool(),task);
    this.schoolService.deleteGivenTask(this.schoolService.getCurrentSchool(),task);

    this.listOfTask = this.schoolService.getTasksForSchool(this.schoolService.getCurrentSchool());
    console.log('after delete', this.listOfTask);
  }

  editTask(givenTask){
    this.schoolService.clickedTask = givenTask;
    this.dialog.open(EditTaskComponent);
  }


  // updateTaskList(){
  //   let currentSchool :string = ;
  //   this.listOfTask = this.manageData.getTasksForSchool(this.manageData.getCurrentSchool());
  //   this.manageData.printItems();
  // }

  
}
