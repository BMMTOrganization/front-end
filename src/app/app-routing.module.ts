import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {HelpComponent} from './help/help.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {TransferComponent} from './transfer/transfer.component';
import {CheckingAccountComponent} from './checking-account/checking-account.component';
import {SavingsAccountComponent} from './savings-account/savings-account.component';
import {InvestmentAccountComponent} from './investment-account/investment-account.component';
import {DevPortalComponent} from './dev-portal/dev-portal.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: LoginComponent },
  { path: 'help', component: HelpComponent},
  { path: 'checking', component: CheckingAccountComponent},
  { path: 'savings', component: SavingsAccountComponent},
  { path: 'investment', component: InvestmentAccountComponent},
  { path: 'login', component: LoginComponent },
  { path: 'Create-Profile', component: UserProfileComponent},
  { path: 'transfer', component: TransferComponent },
  { path: 'devPage', component: DevPortalComponent  },

  // otherwise redirects to home
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
