import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
// import { appConfig } from './app/app.config'; // Will create app.config later if needed for providers

bootstrapApplication(AppComponent, {
  // providers: appConfig.providers // Or directly list providers here
})
  .catch((err) => console.error(err));
