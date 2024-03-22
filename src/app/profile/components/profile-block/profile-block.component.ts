import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { IconComponent } from '@core/components/icon';
import { EBlockState } from '@core/models/client';

const imports = [IconComponent, NgIf];
@Component({
  imports,
  selector: 'app-profile-block',
  standalone: true,
  styleUrl: 'profile-block.component.scss',
  templateUrl: 'profile-block.component.html',
})
export class ProfileBlockComponent implements OnInit {
  @Input() collapsable = false;
  @Input() initialState: EBlockState = EBlockState.expanded;

  collapsed = false;

  ngOnInit(): void {
    this.collapsed = this.collapsable && this.initialState === EBlockState.collapsed;
  }

  switchCollapsed(): void {
    if (!this.collapsable) {
      return;
    }
    this.collapsed = !this.collapsed;
  }
}
