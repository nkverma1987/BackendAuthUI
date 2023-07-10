import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      userName: ['', Validators.required]
    });
  }

  hideShowPassword(): void {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? "fa-eye" : "fa-eye-slash";
    this.type = this.isText ? "text" : "password";
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.contains).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    })
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      this.auth.signUp(this.signUpForm.value)
        .subscribe({
          next: (res) => {
            alert(res.message);
            this.signUpForm.reset();
            this.router.navigate(['login']);
          },
          error: (err) => {
            alert(err?.error.message)
          }
        });
    }
    else {
      this.validateAllFormFields(this.signUpForm);
      alert('Form is not valid!');
    }
  }
}
