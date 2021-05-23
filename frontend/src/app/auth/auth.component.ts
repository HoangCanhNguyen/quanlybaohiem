import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public loginForm: FormGroup;
  public message: string;

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      username: new FormControl('admin', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl('admin@123', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit(): void {}

  onLogin(): void {
    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        this.message = null
      },
      (err) => {
        console.log(err);
        this.message = err.msg
      }
    );
  }
}
