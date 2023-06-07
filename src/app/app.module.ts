import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'zone.js';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { SavingsComponent } from './savings/savings.component';
import { CreditCardsComponent } from './credit-cards/credit-cards.component';
import { LoanComponent } from './loan/loan.component';
import { InvestmentsComponent } from './investments/investments.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout.component';
import { AboutComponent } from './about/about.component';
import { FormsModule } from '@angular/forms';
import { DepositComponent} from './savings/deposit/deposit.component'
import { TransferComponent} from './savings/transfer/transfer.component'
import { WithdrawlComponent} from './savings/withdrawl/withdrawl.component'
import { NewcardComponent} from './newcard/newcard.component';

// import {NewcardComponetnt} from 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SavingsComponent,
    CreditCardsComponent,
    LoanComponent,
    InvestmentsComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    ProfileComponent,
    LogoutComponent,
    AboutComponent,
    DepositComponent,
    WithdrawlComponent,
    TransferComponent,
    NewcardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
