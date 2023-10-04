import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'config',
    loadComponent: () =>
      import('./pages/config/config.component').then((m) => m.ConfigComponent),
  },
  {
    path: 'printer',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/camera/camera.component').then((m) => m.CameraComponent),
  },
  {
    path: 'debug',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/debug/debug.component').then((m) => m.DebugComponent),
  },
  {
    path: 'homebridge',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/homebridge/homebridge.component').then(
        (m) => m.HomebridgeComponent
      ),
  },
  {
    path: 'router',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home-router/home-router.component').then(
        (m) => m.HomeRouterComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
