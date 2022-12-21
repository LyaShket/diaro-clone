import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  @Input() user: IUser;
}
