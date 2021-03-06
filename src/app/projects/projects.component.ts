import {
  Component
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  constructor(public router: Router) {}

  navigate(route: string) {
    this.router.navigateByUrl(route);
  }
}
