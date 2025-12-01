import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/navbar/navbar';
import { Sidebar } from './core/sidebar/sidebar';
import { Main } from './core/main/main';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Sidebar, Main, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('admin-dashboard');
}
