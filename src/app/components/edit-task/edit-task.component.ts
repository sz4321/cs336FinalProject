import { Component, OnInit } from '@angular/core';
import { manageData } from 'src/app/data/manageData';
import { SchoolService } from 'src/app/services/school.service';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  // The name of the edited new task that was entered 
  newTask = '';

  constructor(private manageData:manageData,
    private schoolService:SchoolService) { }

  ngOnInit(): void {
  }

  //Save this name in the database
  editTask(){
    this.schoolService.editGivenTask(this.schoolService.getCurrentSchool(),this.schoolService.clickedTask, this.newTask);
  }
}
