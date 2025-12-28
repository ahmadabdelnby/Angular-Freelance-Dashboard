import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../../../../services2/loginService/login-service';
declare const bootstrap: any; // needed for Bootstrap 5 JS
@Component({
  selector: 'app-admin-profile',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.scss',
  encapsulation: ViewEncapsulation.None
})
export class AdminProfile implements OnInit {
  //@Input() user: any; // pass in the current user
  user: any;

  constructor(public loginService: LoginService, private el: ElementRef) { }

  ngOnInit(): void {
    this.user = this.loginService.getCurrentUser();

  }

  logout() {
    // 1️⃣ call your logout service
    this.loginService.logout();

    // 2️⃣ close the modal programmatically
    const modalEl = this.el.nativeElement.querySelector('#profileModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) {
      modalInstance.hide();
    }
  }
}
