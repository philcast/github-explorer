import { User } from './model';
import { Action } from 'redux';

export type UserAction =
  | ContributorsLoaded
  ;

export interface ContributorsLoaded extends Action {
  type: 'CONTRIBUTORS_LOADED';
  repositoryId: number;
  contributors: User[];
}

export const contributorsLoaded = (repositoryId: number, contributors: User[]): ContributorsLoaded => ({
  type: 'CONTRIBUTORS_LOADED',
  repositoryId,
  contributors
});
