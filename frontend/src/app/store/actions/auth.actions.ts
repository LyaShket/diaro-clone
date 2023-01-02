import { IUser } from '../../shared/interfaces/user';

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { username: string, password: string }) {}
}

export class Register {
  static readonly type = '[Auth] Register';
  constructor(public payload: { username: string, password: string }) {}
}

export class LoadProfile {
  static readonly type = '[Auth] Load Profile';
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class UpdateProfile {
  static readonly type = '[Auth] Update Profile';
  constructor(public payload: { avatar: string }) {}
}

export class UpdateProfileSuccess {
  static readonly type = '[Auth] Update Profile Success';
  constructor(public user: IUser) {}
}
