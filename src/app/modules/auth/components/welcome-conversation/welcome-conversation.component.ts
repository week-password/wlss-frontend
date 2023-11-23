import { Component } from '@angular/core';

import { EBaseColor } from '@core/models';

@Component({
  selector: 'app-welcome-conversation',
  templateUrl: './welcome-conversation.component.html',
  styleUrls: ['./welcome-conversation.component.scss']
})
export class WelcomeConversationComponent {
  EBaseColor = EBaseColor;
  readonly conversation = [
    'Что такое Wisher?',
    'Wisher - это сервис, который поможет вам создавать списки желаний и легко делиться ими со своими близкими и друзьями',
    'Вау! А как я могу им\nвоспользоваться?',
    'Достаточно просто зарегистрироваться, используя электронную почту, и можно создавать списки желаний!',
  ];
}
