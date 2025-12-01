import { Component } from '@angular/core';
import { Content } from '../content/content';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-main',
  imports: [Content, Navbar],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {

}
