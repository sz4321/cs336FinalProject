import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';


const routes: Routes = [{path:'', component: LogInComponent},
                        {path:'home', component: HomePageComponent},
                        {path:'to-do-list', component: ToDoListComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
