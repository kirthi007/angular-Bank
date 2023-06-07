import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormBuilder,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-newcard',
  templateUrl: './newcard.component.html',
  styleUrls: ['./newcard.component.css'],
})
export class NewcardComponent implements OnInit {
  editCardForm!: FormGroup;
  formBuilder: any;

  @Input()
  editcard: any;
  @Output() cardSaved = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.editCardForm = new FormGroup({
      bankName: new FormControl('', [
        Validators.required,
        this.noWhitespaceValidator,
      ]),
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.required,
        Validators.pattern('[0-9]{16}'),
      ]),
      cardHolder: new FormControl('', [
        Validators.required,
        this.noWhitespaceValidator,
      ]),
      cardExpiry: new FormControl('', [
        Validators.required,
        Validators.required,
        Validators.pattern('[0-9]{2}/[0-9]{2}'),
      ]),
      cardType: new FormControl('', [
        Validators.required,
        this.noWhitespaceValidator,
      ]),
      cardCVV: new FormControl('', [
        Validators.required,
        Validators.required,
        Validators.pattern('[0-9]{3}'),
      ]),
    });
  }
  noWhitespaceValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    if (control.value && control.value.trim().length === 0) {
      return { whitespace: true };
    }
    return null;
  }
  editCard() {
    if (this.editCardForm.valid) {
      const editedCard = {
        BankName: this.editCardForm.get('bankName').value,
        Card_Number: this.editCardForm.get('cardNumber').value,
        Card_Holder: this.editCardForm.get('cardHolder').value,
        Card_expiry: this.editCardForm.get('cardExpiry').value,
        Card_type: this.editCardForm.get('cardType').value,
        Card_CVV: this.editCardForm.get('cardCVV').value,
      };
      this.cardSaved.emit(editedCard);
    }
  }
}
