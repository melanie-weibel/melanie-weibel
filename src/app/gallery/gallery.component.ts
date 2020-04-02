import {
  Component
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  constructor(public router: Router) {}

  navigate(route: string) {
    this.router.navigateByUrl(route);
  }
}
