import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { WallpaperComponent } from './components/wallpaper/wallpaper.component';
import { ToastComponent } from './shared/toast/toast.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    WallpaperComponent,
    ToastComponent,
    NavComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
