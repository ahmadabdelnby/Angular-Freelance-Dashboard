import { Component } from '@angular/core';
import { Content } from '../content/content';
import { Navbar } from '../navbar/navbar';
import { Content2 } from '../content2/content2';
import { AdminProfile } from '../modals2/adminModal/admin-profile/admin-profile';

@Component({
  selector: 'app-main',
  imports: [Content2, Navbar, AdminProfile],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {

}
