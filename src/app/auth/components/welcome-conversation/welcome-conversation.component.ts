import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

import { MessageComponent } from '@auth/components/message';
import { EBaseColor } from '@core/models';

@Component({
  selector: 'app-welcome-conversation',
  templateUrl: './welcome-conversation.component.html',
  styleUrls: ['./welcome-conversation.component.scss'],
  standalone: true,
  imports: [MessageComponent, NgFor],
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
