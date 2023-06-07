import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

import { MessageComponent } from './components/message/message.component';
import { WelcomeConversationComponent } from './components/welcome-conversation/welcome-conversation.component';
import { WelcomeFormBlockComponent } from './components/welcome-form-block/welcome-form-block.component';

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
