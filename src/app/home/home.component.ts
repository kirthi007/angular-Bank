import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
 

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }
}