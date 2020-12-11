import { Component, OnInit } from '@angular/core';
import { manageData } from 'src/app/data/manageData';
import { SchoolService } from 'src/app/services/school.service';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  newTask = '';

  constructor(private manageData:manageData,
    private schoolService:SchoolService) { }

  ngOnInit(): void {
  }

  editTask(){
    //console.log(this.manageData.clickedTask);
    // this.manageData.editGivenTask(this.manageData.getCurrentSchool(),this.manageData.clickedTask, this.newTask);
    this.schoolService.editGivenTask(this.schoolService.getCurrentSchool(),this.schoolService.clickedTask, this.newTask);
  }
}
