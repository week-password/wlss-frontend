import { Component, Input, OnInit } from '@angular/core';

import { EBlockState } from '@core/models';

@Component({
  selector: 'app-profile-block',
  templateUrl: './profile-block.component.html',
  styleUrls: ['./profile-block.component.scss']
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
