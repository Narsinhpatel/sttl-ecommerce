import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  errormessage: any;

  constructor(private authService:AuthService,private router: Router){}
  private toastService = inject(HotToastService);

  //logout
logout() {
console.log("logout called")
 this.authService.logout().subscribe(
  (res) => {
    this.toastService.success('Logout successfull')
    this.router.navigate(['/login']);
  },
  error => {

   this.errormessage=error.error.message
  }
 );

}

}
