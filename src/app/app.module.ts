import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PlateauComponent } from './components/plateau/plateau.component';
import { CommandPanelComponent } from './components/command-panel/command-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    PlateauComponent,
    CommandPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
