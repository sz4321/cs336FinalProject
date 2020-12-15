import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { observable, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { timeStamp } from 'console';

export interface SchoolTask{
  school: string;
  task: string;
  taskDeadline? :string;
  checked : boolean;
  id : string;
  schoolID : string;
}

export interface School{
  school: string;
  deadline?:string;
  id:string;
}


@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private firestore: AngularFirestore) { 
  }

  schools: School[] = [];
  tasks: SchoolTask[] = [];
  currentSchool: string = '';
  clickedTask: string = '';
  clickedSchool:string = '';

  schoolCollection: Array<School>;
  TaskCollection:Array<SchoolTask>;


  //add school to the list
  addSchool(schoolName:string){
    let schoolExists = this.schools.some(element => element.school === schoolName);

    //generate an ID so it is easier to keep track of when school name is edited and deleted 
    let schoolID = this.firestore.createId();
    let schoolEntered:School = {"school":schoolName, "deadline":"", "id":schoolID};

    //check if school exists and if it doesn't add it
    !schoolExists ? this.firestore.collection('/SchoolList').doc(schoolID).set(schoolEntered) : alert("School name already exists");
  }

  //add a task to the database 
  addTask(givenSchool, givenTask){
    //generate id so it is easier to keep track of later 
    let taskID = this.firestore.createId();
    let schoolID = this.schools.find(element => element.school = givenSchool);
    this.firestore.collection('TaskList').doc(taskID).set({"school":givenSchool,"checked":false,"taskDeadline":'',"task":givenTask, "id":taskID, schoolID:schoolID.id});
  }

  //for testing purposes 
  printItems(){
    console.log("Schools", this.schools);
    console.log("Tasks", this.tasks);
  }

  async ngOnInit() {
    this.firestore.collection<School>('/SchoolList').valueChanges().subscribe((i)=>{
      this.schools = i;
    })
  }

  //return the schools that we have 
   getSchools(){
    return this.schools;
  }

  //set schools 
  setSchools(schools){
    this.schools = schools;
  }

  //get the current tasks 
  getTasks(){
    return this.tasks;
  }

  //set tasks 
  setTasks(tasks){
    this.tasks = tasks;
  }

  //get the name of the current school 
  getCurrentSchool(){
    return sessionStorage.getItem('schoolSelected');
  }

  //set the name of the current school 
  setCurrentSchool(schoolName){
    this.currentSchool = schoolName;
  }

  //get the list of the tasks for a school 
  getTasksForSchool(schoolName){
    try{
      //filter the tasks by school name 
      function getTasks(element){
        if( element.school === schoolName){
          return element.task;
        }
      }
  
      return this.tasks.filter(getTasks);
    }
    catch{
      console.log("unable to read of void");
    }

   
  }

  //check if the task has been checked 
  isChecked(givenSchool:string, givenTask){
    
    //go through each task and check 
    this.tasks.forEach(element=>{
      if(element.school === givenSchool){
        if(element.task === givenTask){
          return element.checked;
        }
      }
    })
  }


  //check a given task 
  check(givenSchool:string,givenTask:string){

    //go through each task and if it has the school and the task specified, then check 
    this.tasks.forEach(element=>{
      if(element.school === givenSchool){
        if(element.task === givenTask){
          this.firestore.collection("TaskList").doc(element.id).update({
            checked:true
          })
        }
      }
    })
  }

  //uncheck a given task 
  uncheck(givenSchool:string,givenTask:string){
    //go through each task and if it has the name of task and school specified, then uncheck 
    this.tasks.forEach(element=>{
      if(element.school === givenSchool){
        if(element.task === givenTask){
          //element.checked = false;
          this.firestore.collection("TaskList").doc(element.id).update({
            checked:false
          })
        }      
      }
    })
  }


  //delete a given task 
  deleteGivenTask(givenSchool, givenTask){

    //go through each task an delete the ones that fullfil the name and task provided 
    this.tasks.forEach(element=>{
      if(element.school === givenSchool){
        if(element.task == givenTask){
          this.firestore.collection('TaskList').doc(element.id).delete();
        }
      }
    })
  }

  //edit the name of a given task 
  editGivenTask(givenSchool, oldTask, newTask){

    //iterate through each task and edit the one provided 
    this.tasks.forEach(element=>{
      if(element.school === givenSchool){
        if(element.task === oldTask){
          let taskRef = this.firestore.collection('TaskList').doc(element.id);
          taskRef.update({
            task:newTask
          })
        }
      }
    })
  }

  //delete the name of school provided 
  deleteSchool(schoolName){
    //go through each task and delete the task with the school name provided 
    this.tasks.forEach(element=>{
      if(element.school == schoolName){
        this.firestore.collection('TaskList').doc(element.id).delete();
      }
    })

    //go through each school and delete the school name 
    this.schools.forEach(element=>{
      if(element.school == schoolName){
        this.firestore.collection('SchoolList').doc(element.id).delete();
      }
    })
  }

  //edit the name of the school 
  editSchool(schoolName, newSchoolName){

    //go through each task and edit the school name of the one provided 
    this.tasks.forEach(element=>{
      if(element.school == schoolName){
        // element.school = newSchoolName;
        this.firestore.collection('TaskList').doc(element.id).update({
          school:newSchoolName
        })
      }
    })

    //go through each school and delete the one provided 
    this.schools.forEach(element=>{
      if(element.school == schoolName){
        //element.school = newSchoolName;
        this.firestore.collection('SchoolList').doc(element.id).update({
          school:newSchoolName
        })
      }
    })
  }
}
