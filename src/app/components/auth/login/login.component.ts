import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { UserI } from "../../../shared/models/user.interface";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

  constructor(public authSvc: AuthService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  ngOnInit(): void {}

  onLogin(form: UserI) {
    console.log("Form", form);
    this.authSvc
      .loginByEmail(form)
      .then(resp => {
        console.log("Succesfully", resp);
        this.router.navigate(['/']);
      })
      .catch(err => console.log("Error", err));
  }
}
