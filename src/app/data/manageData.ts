import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { scheduled } from 'rxjs';

export interface taskSchedule {
  task : string;
  deadline? : string;
  checked:boolean;
}

export interface schoolList {
    "schoolName" : string;
    "tasks" : taskSchedule[];
    // "tasks"? :string[];
}

@Injectable({
  providedIn: 'root'
})
export class manageData {

  constructor() {}
  schools : schoolList[] = [];
  currentSchool : string = '';
  clickedTask : string = '';

  //add school to the list
  addSchool(school){
      this.schools.push({"schoolName":school, "tasks":[]});
  }

  addTask(school, task){

    ///////change
    //Look for the school in the list and add the task entered  
    function checkSchool(element:schoolList){
      if(element.schoolName === school){
        element["tasks"].push({"task":task , "checked":false});
      }
    }
    this.schools.forEach(checkSchool);
  }

  //print the element of the schools --> for debugging purposes 
  printItems(){
      console.log(this.schools);
  }

  //return the list of schools data
  getData(){
      return this.schools;
  }

  //get the school that we are currently in
  getCurrentSchool(){
    return this.currentSchool;
  }

  //set the current school to the school that we clicked into
  setCurrentSchool(schoolName){
    this.currentSchool = schoolName;
  }

  //list the tasks for a specific school 
  getTasksForSchool(schoolNameTask:string){

    try{
      function getTasks(element:schoolList){
        if( element.schoolName === schoolNameTask){
          return element.tasks;
        }
      }
  
      return this.schools.filter(getTasks)[0].tasks;
    }
    catch{
      ////////// BETTER ERROR MESSAGE
      console.log("unable to read of void");
    }

  }

  isChecked(school:string,givenTask:string){
    let schoolName = this.schools.find(element=>element.schoolName === school);
    let isSchoolChecked = schoolName.tasks.find(element => element.task = givenTask);
    console.log('che', isSchoolChecked.checked);
    return isSchoolChecked.checked;
  }

  check(givenSchool:string,givenTask:string){
    //change this if you have time --> not efficient 

    ////////THIS IS A TERRIBLE WAY OF DOING IT
    this.schools.forEach(element => {
      if(element.schoolName === givenSchool){
        element.tasks.forEach(tasks=>{
          if(tasks.task == givenTask){
            tasks.checked = true;
          }
        })
      }
    });
  }

  uncheck(givenSchool:string,givenTask:string){
    ////////THIS IS A TERRIBLE WAY OF DOING IT --> It is a double loop
    this.schools.forEach(element => {
      if(element.schoolName === givenSchool){
        element.tasks.forEach(tasks=>{
          if(tasks.task == givenTask){
            tasks.checked = false;
          }
        })
      }
    });
  }

  deleteGivenTask(givenSchool, givenTask){
    this.schools.forEach(element => {
      if(element.schoolName === givenSchool){
        element.tasks.forEach(tasks=>{
          if(tasks.task == givenTask){
            element.tasks.splice(element.tasks.indexOf(tasks),1);
          }
        })
      }
    })
  }

  editGivenTask(givenSchool, oldTask, newTask){
    this.schools.forEach(element => {
      if(element.schoolName === givenSchool){
        element.tasks.forEach(tasks=>{
          if(tasks.task == oldTask){
            tasks.task = newTask;
          }
        })
      }
    })
  }

}