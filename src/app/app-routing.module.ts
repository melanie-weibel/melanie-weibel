import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutComponent } from './about/about.component';

import { PlotItComponent } from './projects/plot-it/plot-it.component';
import { JeanneGameComponent } from './projects/jeanne-game/jeanne-game.component';
import { ElementsComponent } from './projects/elements/elements.component';

import { DrawingsComponent } from './gallery/drawings/drawings.component';
import { DigitalDrawingsComponent } from './gallery/digital-drawings/digital-drawings.component';
import { PhotographyComponent } from './gallery/photography/photography.component';
import { OthersComponent } from './gallery/others/others.component';
import { TicketsComponent } from './gallery/tickets/tickets.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},

  { path: 'projects/plot-it', component:PlotItComponent, pathMatch: 'full'},
  { path: 'projects/jeanne-game', component:JeanneGameComponent , pathMatch: 'full'},
  { path: 'projects/elements', component:ElementsComponent , pathMatch: 'full'},
  { path: 'projects', component: ProjectsComponent},

  { path: 'gallery', component: GalleryComponent},
  { path: 'gallery/drawings', component: DrawingsComponent},
  { path: 'gallery/digital-drawings', component: DigitalDrawingsComponent},
  { path: 'gallery/photography', component: PhotographyComponent},
  { path: 'gallery/others', component: OthersComponent},
  { path: 'gallery/tickets', component: TicketsComponent},

  /*{ path: 'gallery', component: GalleryComponent,
    children: [
      { path: 'drawings', component: DrawingsComponent},
      { path: 'digital-drawings', component: DigitalDrawingsComponent},
      { path: 'photography', component: PhotographyComponent},
      { path: 'others', component: OthersComponent},
      { path: 'tickets', component: TicketsComponent}
    ]
  },*/

  { path: 'about', component: AboutComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
