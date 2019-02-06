import { NgModule } from '@angular/core';
import {FaIconComponent} from "./fa-icon/fa-icon.component";
import {CommonModule} from "@angular/common";
import {IonicModule} from "ionic-angular";
import { ControlMessagesComponent } from './control-messages/control-messages';

@NgModule({
	declarations: [FaIconComponent,
    ControlMessagesComponent],
	imports: [CommonModule, IonicModule],
	exports: [FaIconComponent,
    ControlMessagesComponent]
})
export class ComponentsModule {}
