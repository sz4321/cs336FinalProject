import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';



@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private router: Router) { }

  username = '';
  password = '';


  ngOnInit(): void {
  }

  signIn(){

    //if username is empty, alert that username is requried 
    if(this.username === ''){
      alert('Username is required')
    }else{
      //if username is provided, set the session storage with the current username 
      sessionStorage.setItem('userName', this.username);
      //require password 
      if(this.password == ''){
        alert('Password is required');
      }else{
        //save true for password and navigate to the home page
        sessionStorage.setItem('passwordEntered', "true");
        this.router.navigate(['/home']);
      }
    }
    
  }

  //when create a new account is clicked, open the sign up component 
  createNewAccount(){
     this.dialog.open(SignUpComponent);
  }
}
