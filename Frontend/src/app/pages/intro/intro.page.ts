import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  buttonClicked() {
    this.router.navigate(['/home']);
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
