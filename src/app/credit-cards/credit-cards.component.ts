import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-credit-cards',
  templateUrl: './credit-cards.component.html',
  styleUrls: ['./credit-cards.component.css'],
})
export class CreditCardsComponent implements OnInit {
  showAddCard: boolean = false;
  newCard: any = {};
  addCardForm!: FormGroup;
  showEditCard: boolean = false;
  cardArray: any;
  cards: any = [];
  acno: number;
  currentUserards: any;
  selectedCard: any;
  cardIndex: number;
  verifyEditCard(card: any) {
    this.showEditCard = !this.showEditCard;
    this.card = card;
  }

  BanksLogo = [
    {
      BankName: 'DEXIA',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4NeXc5D_kvUtsjqEjEcB0qjPHV-u8_md2ePubRWaluhh_Kx1S6NxN1C7MUxW-3OUwCs8&usqp=CAU',
    },
    {
      BankName: 'ICICI',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe7u6HvHALex-t-oJ1g4u3fJZ3UpGpwlqpww&usqp=CAU',
    },
    {
      BankName: 'HDFC',
      logo: 'https://1000logos.net/wp-content/uploads/2021/06/HDFC-Bank-emblem.png',
    },
  ];

  CardTypeLogo = [
    {
      Card_type: 'VISA',
      logo: 'https://www.freepnglogos.com/uploads/visa-card-logo-9.png',
    },
    {
      Card_type: 'RuPay',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Rupay-Logo.png/800px-Rupay-Logo.png?20200811062726',
    },
    {
      Card_type: 'MASTER',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.initForm();

    const storedData = localStorage.getItem('currentUser');

    if (storedData) {
      const userData = JSON.parse(storedData);
      this.acno = Number(userData.account);
    }
    const storedcard = localStorage.getItem('Cards');
    this.cards = storedcard ? JSON.parse(storedcard) : {};
    this.cardArray = storedcard ? JSON.parse(storedcard) : [];

    this.currentUserards = this.cardArray.filter((CARDS: any) => {
      return CARDS.account === this.acno;
    });
  }

  initForm() {
    this.addCardForm = new FormGroup({
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
  getBankLogo(bankName: string): any {
    let logo;
    this.BanksLogo.forEach((ele) => {
      if (ele.BankName == bankName) {
        logo = ele.logo;
      }
    });
    return logo;
  }

  getCardTypeLogo(cardType: string): any {
    let logo;
    this.CardTypeLogo.forEach((ele) => {
      if (ele.Card_type == cardType) {
        logo = ele.logo;
      }
    });
    return logo;
  }
  card: any;
  verifyAddCard() {
    this.showAddCard = !this.showAddCard;
  }

  addCard() {
    // Add card logic
    if (this.addCardForm.valid) {
      // Get form values
      const bankName = this.addCardForm.get('bankName').value;
      const cardNumber = this.addCardForm.get('cardNumber').value;
      const cardHolder = this.addCardForm.get('cardHolder').value;
      const cardExpiry = this.addCardForm.get('cardExpiry').value;
      const cardType = this.addCardForm.get('cardType').value;
      const cardCVV = this.addCardForm.get('cardCVV').value;

      // Create a new card object with the form values
      const newCard = {
        BankName: bankName,
        Card_Number: cardNumber,
        Card_Holder: cardHolder,
        Card_expiry: cardExpiry,
        Card_type: cardType,
        Card_CVV: cardCVV,
        account: this.acno,
      };
      this.cardArray.push(newCard);

      // Save the new card object to the CreditCards array
      localStorage.setItem('Cards', JSON.stringify(this.cardArray));
    }
  }
  CardIndex() {
    this.cardIndex = this.cardArray.findIndex((card: any) => {
      console.log(card, 'Cards');
      return (
        card.Card_Number === this.selectedCard.Card_Number &&
        card.Card_Holder === this.selectedCard.Card_Holder &&
        card.Card_expiry === this.selectedCard.Card_expiry &&
        card.Card_type === this.selectedCard.Card_type &&
        card.Card_CVV === this.selectedCard.Card_CVV
      );
    });
  }

  updateCard(updatedCard: any) {
    console.log(updatedCard, 'updated');

    if (this.cardIndex !== -1) {
      this.cardArray[this.cardIndex] = updatedCard;
      localStorage.setItem('Cards', JSON.stringify(this.cardArray));
    }
  }
  selectCard(card: any) {
    // Perform operations with the selected card
    console.log(card, 'selected card'); // Example: Log the selected card

    // You can also update the selected card in the component's property
    this.selectedCard = card;
  }
}
