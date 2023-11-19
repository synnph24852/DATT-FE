import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { UserService } from '~/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '~/app/@types';
import { Router } from '@angular/router';
import {
  AllValidationErrors,
  getErrorValidator,
  getFormValidationErrors,
} from '~/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toast: ToastrService,
    private router: Router
  ) {}

  userForm = this.fb.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  getErrors(fieldName: string) {
    const control = this.userForm.get(fieldName) as any;
    return control.errors;
  }

  onHandleSubmit() {
    if (!this.userForm.valid) {
      const error: string = getErrorValidator(this.userForm);
      this.toast.error(error);
      return;
    }
    if (this.userForm.valid) {
      const user: Omit<IUser, 'avatar' | '_id'> = {
        fullname: this.userForm.value.fullname || '',
        email: this.userForm.value.email || '',
        password: this.userForm.value.password || '',
      };
      this.userService.singup(user as IUser).subscribe(
        (response: any) => {
          this.toast.success(response.message);
          this.router.navigate(['/login']);
        },
        (error) => {
          this.toast.error(error?.error.message);
        }
      );
    }
  }
}
