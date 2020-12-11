import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { observable, Observable } from 'rxjs';



export interface SchoolTask{
  school: string;
  task: string;
  taskDeadline? :string;
  checked : boolean;
}

export interface School{
  school: string;
  deadline?:string;
}


@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor() { }

  schools: School[] = [];
  tasks: SchoolTask[] = [];
  currentSchool: string = '';
  clickedTask: string = '';
  clickedSchool:string = '';

  //add school to the list
  addSchool(schoolName:string){
    let schoolExists = this.schools.some(element => element.school === schoolName);
    //check if school exists and if it doesn't add it
    !schoolExists ? this.schools.push({"school":schoolName, "deadline":""}) : alert("School name already exists");
  }

  addTask(givenSchool, givenTask){
    this.tasks.push({"school":givenSchool,"checked":false,"taskDeadline":'',"task":givenTask});
  }

  printItems(){
    console.log("Schools", this.schools);
    console.log("Tasks", this.tasks);
  }

  getSchools(){
    return this.schools;
  }

  getTasks(){
    return this.tasks;
  }

  getCurrentSchool(){
    return this.currentSchool;
  }

  setCurrentSchool(schoolName){
    this.currentSchool = schoolName;
  }

  
  getTasksForSchool(schoolName){
    // let tasksForSchool = [];

    // this.tasks.forEach(element => {
    //   if(element.school === schoolName){
    //     tasksForSchool.push(element);
    //   }
    // })

    // return tasksForSchool;



    // try{
    //   function getTasks(element){
    //     if( element.school === schoolName){
    //       return element.task;
    //     }
    //   }
    //   console.log('called here');
    //   return this.tasks.filter(getTasks)[0];
    // }
    // catch{
    //   ////////// BETTER ERROR MESSAGE
    //   console.log("unable to read of void");
    // }

    // this.tasks.forEach(element => {
    //   if(element.school === this.currentSchool){
    //     tasksForSchool.push(element);
    //   }
    // })

    // console.log('here');
    // return tasksForSchool;

    try{
      function getTasks(element){
        if( element.school === schoolName){
          return element.task;
        }
      }
  
      return this.tasks.filter(getTasks);
    }
    catch{
      ////////// BETTER ERROR MESSAGE
      console.log("unable to read of void");
    }

   
  }

  // testFunction(schoolName){
  //   this.currentTasks = this.getTasksForSchool(schoolName);
  //   console.log('empty', this.currentTasks);
  //   return this.currentTasks;
  // }

  isChecked(givenSchool:string, givenTask){
    
    this.tasks.forEach(element=>{
      if(element.school === givenSchool){
        if(element.task === givenTask){
          return element.checked;
        }
      }
    })
  }

  check(givenSchool:string,givenTask:string){
    this.tasks.forEach(element=>{
      if(element.school === givenSchool){
        if(element.task === givenTask){
          element.checked = true;
        }
      }
    })
  }

  uncheck(givenSchool:string,givenTask:string){
    this.tasks.forEach(element=>{
      if(element.school === givenSchool){
        if(element.task === givenTask){
          element.checked = false;
        }      
      }
    })
  }

  deleteGivenTask(givenSchool, givenTask){
    this.tasks.forEach(element=>{
      if(element.school === givenSchool){
        if(element.task == givenTask){
          this.tasks.splice(this.tasks.indexOf(element), 1);
        }
      }
    })
  }

  editGivenTask(givenSchool, oldTask, newTask){
    this.tasks.forEach(element=>{
      if(element.school === givenSchool){
        if(element.task === oldTask){
          element.task = newTask;
        }
      }
    })
  }

  deleteSchool(schoolName){
    this.schools.forEach(element=>{
      if(element.school == schoolName){
        this.schools.splice(this.schools.indexOf(element),1);
      }
    })

    this.tasks.forEach(element=>{
      if(element.school==schoolName){
        this.tasks.splice(this.tasks.indexOf(element),1);
      }
    })
  }

  editSchool(schoolName, newSchoolName){
    this.tasks.forEach(element=>{
      if(element.school == schoolName){
        element.school = newSchoolName;
      }
    })

    this.schools.forEach(element=>{
      if(element.school == schoolName){
        element.school = newSchoolName;
      }
    })

    console.log('tasks', this.tasks);
    console.log('schools', this.schools);
  }

}
