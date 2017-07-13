import { Action } from './actions';

export type Map<T> = { [id: number]: T };
export type StateMap<T> = Readonly<Map<T>>;

export type Reducer<T> = (state: T, action: Action) => T;
