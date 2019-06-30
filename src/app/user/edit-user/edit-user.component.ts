import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, NgForm } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  //userForm: FormGroup;
  @ViewChild('f', { static: true }) userForm: NgForm;
  user: User;
  paramsSubscription: Subscription;

  constructor(private userService: UserService, private router: Router, private activeRoute: ActivatedRoute) {
    // if(this.activeRoute.snapshot.params['id']){
    //   this.user = this.userService.getUser(+this.activeRoute.snapshot.params['id']);
    // }else{
    //   this.user = {
    //     id : 0,
    //     name : '',
    //     lastname : '',
    //     age : 0,
    //     active : false,
    //     image : ''
    //   }
    // }

  }

  ngOnInit() {
    this.paramsSubscription = this.activeRoute.params.subscribe(
      (params: Params) => {
        if(params['id']){
          this.user = this.userService.getUser(+params['id']);
        }else{
          this.user = {
                id : 0,
                name : '',
                lastname : '',
                age : 0,
                active : false,
                image : ''
              };
        }
        
      }
    );
  }

  addUser() {
    let id = this.userService.addUser2(this.user);
    this.router.navigate(['users', id]);
  }

}
