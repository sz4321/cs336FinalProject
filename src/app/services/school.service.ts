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
    // this.firestore.collection<School>('/SchoolList').valueChanges();
    // this.schools = firestore.collection<School>('/SchoolList');
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
    //check if school exists and if it doesn't add it
    let schoolID = this.firestore.createId();
    let schoolEntered:School = {"school":schoolName, "deadline":"", "id":schoolID};
    // !schoolExists ? this.schools.push({"school":schoolName, "deadline":""}) : alert("School name already exists");
    !schoolExists ? this.firestore.collection('/SchoolList').doc(schoolID).set(schoolEntered) : alert("School name already exists");
  }

  addTask(givenSchool, givenTask){
    let taskID = this.firestore.createId();
    let schoolID = this.schools.find(element => element.school = givenSchool);
    //this.tasks.push({"school":givenSchool,"checked":false,"taskDeadline":'',"task":givenTask, "id":this.firestore.createId(), schoolID:schoolID.id});
    this.firestore.collection('TaskList').doc(taskID).set({"school":givenSchool,"checked":false,"taskDeadline":'',"task":givenTask, "id":taskID, schoolID:schoolID.id});
  }

  printItems(){
    console.log("Schools", this.schools);
    console.log("Tasks", this.tasks);
  }

  // async testFun(){
  //   console.log('from database', this.schools);

  
  // }

  async ngOnInit() {
    this.firestore.collection<School>('/SchoolList').valueChanges().subscribe((i)=>{
      this.schools = i;
    })
  }

  
   getSchools(){
    // this.schools = this.firestore.collection('/SchoolList').get()
    // await this.ngOnInit();
    // console.log('from get school' , this.schools);
    return this.schools;
  }

  setSchools(schools){
    this.schools = schools;
  }
  getTasks(){
    return this.tasks;
  }

  setTasks(tasks){
    this.tasks = tasks;
  }

  getCurrentSchool(){
    // return this.currentSchool;

    //get the last clicked school from the sessionstorage
    return sessionStorage.getItem('schoolSelected');
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
          this.firestore.collection("TaskList").doc(element.id).update({
            checked:true
          })
          //element.checked = true;
        }
      }
    })
  }

  uncheck(givenSchool:string,givenTask:string){
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


  deleteGivenTask(givenSchool, givenTask){
    this.tasks.forEach(element=>{
      if(element.school === givenSchool){
        if(element.task == givenTask){
          //this.tasks.splice(this.tasks.indexOf(element), 1);
          this.firestore.collection('TaskList').doc(element.id).delete();
        }
      }
    })
  }

  editGivenTask(givenSchool, oldTask, newTask){
    // let taskRef = this.firestore.collection('TaskList').doc(givenSchool+oldTask);
    // taskRef.update({
    //   task:newTask
    // })


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

  deleteSchool(schoolName){
    
    console.log(this.tasks);
    this.tasks.forEach(element=>{
      if(element.school == schoolName){
        this.firestore.collection('TaskList').doc(element.id).delete();
      }
    })

    this.schools.forEach(element=>{
      if(element.school == schoolName){
        this.firestore.collection('SchoolList').doc(element.id).delete();
      }
    })

    // this.schools.forEach(element=>{
    //   if(element.school == schoolName){
    //     this.schools.splice(this.schools.indexOf(element),1);
    //   }
    // })

    // this.tasks.forEach(element=>{
    //   if(element.school==schoolName){
    //     this.tasks.splice(this.tasks.indexOf(element),1);
    //   }
    // })
  }

  editSchool(schoolName, newSchoolName){
    this.tasks.forEach(element=>{
      if(element.school == schoolName){
        // element.school = newSchoolName;
        this.firestore.collection('TaskList').doc(element.id).update({
          school:newSchoolName
        })
      }
    })

    this.schools.forEach(element=>{
      if(element.school == schoolName){
        //element.school = newSchoolName;
        this.firestore.collection('SchoolList').doc(element.id).update({
          school:newSchoolName
        })
      }
    })

    console.log('tasks', this.tasks);
    console.log('schools', this.schools);
  }



}
