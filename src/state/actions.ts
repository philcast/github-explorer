import { RepositoryAction } from './entities/repository';
import { UserAction } from './entities/user';
import { RepositoryPageAction } from './ui/repositoryPage';

export type Action =
  | RepositoryAction
  | UserAction
  | RepositoryPageAction
  | AppCrashed
  ;

export interface AppCrashed {
  type: 'APP_CRASHED';
  error: string;
}

export const appCrashed = (error: string = 'A technical error occured'): AppCrashed => ({
  type: 'APP_CRASHED',
  error
});