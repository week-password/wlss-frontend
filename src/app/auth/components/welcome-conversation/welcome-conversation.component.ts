import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

import { MessageComponent } from '@auth/components/message';
import { EBaseColor } from '@core/models/client';

const imports = [MessageComponent, NgFor];
@Component({
  imports,
  selector: 'app-welcome-conversation',
  standalone: true,
  styleUrl: 'welcome-conversation.component.scss',
  templateUrl: 'welcome-conversation.component.html',
})
export class WelcomeConversationComponent {
  readonly EBaseColor = EBaseColor;
  readonly conversation = [
    'Что такое Wisher?',
    'Wisher - это сервис, который поможет вам создавать списки желаний и легко делиться ими со своими близкими и друзьями',
    'Вау! А как я могу им\nвоспользоваться?',
    'Достаточно просто зарегистрироваться, используя электронную почту, и можно создавать списки желаний!',
  ];
}
