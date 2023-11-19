import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '~/app/services/user.service';
import {
  AllValidationErrors,
  getErrorValidator,
  getFormValidationErrors,
} from '~/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private userservice: UserService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private router: Router
  ) {}
  error: string = '';
  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });
  onHandleSubmit() {
    if (!this.userForm.valid) {
      const error: string = getErrorValidator(this.userForm);
      this.toast.error(error);
      return;
    }
    if (this.userForm.valid) {
      const User: any = {
        email: this.userForm.value.email || '',
        password: this.userForm.value.password || '',
      };
      this.userservice.singin(User).subscribe(
        // data=>console.log('data')
        (response: any) => {
          const token: any = response.accessToken;
          localStorage.setItem('access_token', token);
          localStorage.setItem('auth', JSON.stringify(response?.data));
          this.toast.success(response.message);
          this.router.navigate(['/']);
        },
        (error: any) => {
          this.toast.error(
            'Đã a có lỗi xảy ra, vui lòng thử lại sau',
            error?.error.message
          );
        }
      );
    }
  }
}
