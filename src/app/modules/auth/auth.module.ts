import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';

import { AuthRoutingModule } from './auth-routing.module';
import { MessageComponent } from './components/message';
import { WelcomeConversationComponent } from './components/welcome-conversation';
import { WelcomeFormBlockComponent } from './components/welcome-form-block';
import { SigninComponent } from './pages/signin';
import { SignupComponent } from './pages/signup';

const pages = [
  SigninComponent,
  SignupComponent,
];
const components = [
  MessageComponent,
  WelcomeConversationComponent,
  WelcomeFormBlockComponent,
];
const modules = [
  AuthRoutingModule,
  CommonModule,
  SharedModule,
];

@NgModule({
  declarations: [
    ...pages,
    ...components,
  ],
  imports: [
    ...modules,
  ]
})
export class AuthModule { }
