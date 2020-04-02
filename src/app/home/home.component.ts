import {
  Component
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public router: Router) {}

  navigate(route: string) {
    this.router.navigateByUrl(route);
  }
}
