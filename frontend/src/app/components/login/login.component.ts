import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [  ToastrModule,MatFormFieldModule,FormsModule,ReactiveFormsModule,MatCardModule, MatInputModule, MatSelectModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  

})
export class LoginComponent {
  constructor(private authservice:AuthService,private router: Router,){}
  private toastService = inject(HotToastService);
  errormessage=""
  showToast() {
    this.toastService.success('Login Successfull',{
      style: {
      
        padding: '16px',
        color: '#713200',
      },
    })
  }

  //signin
signIn() {
  if (this.signinForm.valid) {
    console.log(this.signinForm.value)
    this.authservice.login(this.signinForm.value).subscribe(
      (res) => {
        this.showToast()
       this.router.navigate(['/']);
        
      },
      error => {
       console.log(error.error.message)
       this.errormessage=error.error.message
       this.toastService.error('Somthing went Wrong please try again ')
      }
    );
  }
}
signinForm:FormGroup=new FormGroup({

    
    email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    

  })
}
