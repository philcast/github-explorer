import { StateMap } from 'state/helpers';

export interface User {
  id: number;
  login: string;
  avatarUrl: string;
}

export type UserDomainState = Readonly<StateMap<User>>;