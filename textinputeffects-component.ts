// Styles stole from - https://github.com/codrops/TextInputEffects

import { Component, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { TextFieldEffects } from "./text-field-effects";

@Component({
  selector: "text-input-effects",
  templateUrl:"./textinputeffects-component.html",
  styleUrls: [
    "./css/normalize.css", 
    "./css/set1.css", 
    "./css/set2.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextFieldComponent,
      multi: true,
    }
  ]
})
export class TextFieldComponent implements ControlValueAccessor {

  //Property view inputs bind to.
  public model: string;

  //#region Inputs

  @Input()
  public placeholder : string;
  

  /**
   * Fa Icon Class.
   * Defaults to question-circle.
   */
  @Input()
  public icon: string = "question-circle";

  /**
   * Input effect style.Defaults to fumi.
   */
  @Input()
  public type: string = TextFieldEffects.Fumi;

  /**
   * Defines the input type.
   * True = Textarea
   * False = Input[type=text]
   */
  @Input()
  public multiline: boolean = false;

  //#endregion

  /**
   * Defines the CSS class for the FA icon
   */
  public get iconClass() {
    return `fas fa-${this.icon} icon icon--${this.type}`;
  }

  //#region Input style classes
  public get inputClass() {
    return `input__field input__field--${this.type}`;
  }

  public get wrapperClass() {
    return `input input--${this.type}`;
  }

  public get contentClass() {
    return `input__label-content input__label-content--${this.type}`;
  }

  public get labelClass() {
    return `input__label input__label--${this.type} ${
      this.model != undefined && this.model != "" ? "input--filled" : ""
    }`;
  }
  //#endregion

  //#region ControlValueAccessor Implementation

  /**
   * Store Form Control methods passed in by ControlValueAccessor
   */
  private valueAccessorOnChangeEvent: any;
  private valueAccessorOnBlurEvent: any;

  /**
   * invoked on onkeyup event for the view inputs.
   * Invokes the value accessor change event.
   */
  public valueChanged = () => {
    if (this.valueAccessorOnChangeEvent != undefined) {
      this.valueAccessorOnChangeEvent(this.model);
    }
  };

  /**
   * Invked on onBlur event for view inputs
   */
  public inputOnBur = () => {
    if (this.valueAccessorOnBlurEvent != undefined) {
      this.valueAccessorOnBlurEvent();
    }
  };

  writeValue(obj: any): void {
    this.model = obj as string;
  }
  registerOnChange(fn: any): void {
    this.valueAccessorOnChangeEvent = fn;
  }
  registerOnTouched(fn: any): void {
    this.valueAccessorOnBlurEvent = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }
  //#endregion
}
