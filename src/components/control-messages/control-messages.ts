import {Component, Input} from '@angular/core';
import {ValidationService} from "../../providers/app.validation-service";
import {FormControl} from "@angular/forms";

@Component({
  selector: "control-messages",
  templateUrl: "control-messages.html"
})
export class ControlMessagesComponent {
  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}
