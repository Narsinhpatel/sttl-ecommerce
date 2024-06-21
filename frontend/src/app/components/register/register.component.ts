import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule,FormsModule,ReactiveFormsModule,MatCardModule, MatInputModule, MatSelectModule,CommonModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


errormessage=""
  constructor(private authservice:AuthService, private router: Router){}
  private toastService = inject(HotToastService);
  showToast() {
    this.toastService.success('Registeration  Successfull,Please Login',{
      style: {
      
        padding: '16px',
        color: '#713200',
      },
    })
  }
onSubmit() {


  console.log(this.registrationForm)

  if (this.registrationForm.valid) {
    

    this.authservice.register(this.registrationForm.value).subscribe(
      response=>{
        console.log(response)
        console.log("data saved successfully")
        this.showToast()
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error registering user', error);
           
        this.errormessage=error.error.message
        this.toastService.error('Somthing went Wrong please try again ')
      }

    )
  }

}


  registrationForm:FormGroup=new FormGroup({

    username:new FormControl("",[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      gender: new FormControl('',Validators.required),  
      bio: new FormControl(''),

  })
}
