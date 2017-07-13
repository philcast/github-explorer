import { Repository } from './model';
import { User } from 'state/entities/user';
import { Action } from 'redux';

export type RepositoryAction =
  | RepositoriesLoaded
  ;

export interface RepositoriesLoaded extends Action {
  type: 'REPOSITORIES_LOADED';
  repositories: Repository[];
  owners: User[];
}

export const repositoriesLoaded = (
  repositories: Repository[], owners: User[]
): RepositoriesLoaded => ({
  type: 'REPOSITORIES_LOADED',
  repositories,
  owners
});
