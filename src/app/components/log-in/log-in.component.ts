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
    console.log("Inside sign in");
    //if user hasn't entered username, show an alert
    //otherwise check if they have entered password
    //if not, show an alert, if they did, take to next page
    if(this.username === ''){
      alert('Username is required')
    }else{
      sessionStorage.setItem('userName', this.username);
      if(this.password == ''){
        alert('Password is required');
      }else{
        sessionStorage.setItem('passwordEntered', "true");
        this.router.navigate(['/home']);
      }
    }
    
  }

  createNewAccount(){
     this.dialog.open(SignUpComponent);
  }
}
