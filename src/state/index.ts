import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { RepositoryDomainState, repositoryReducer } from './entities/repository';
import { UserDomainState, userReducer } from './entities/user';
import { RepositoryPageState, repositoryPageReducer } from './ui/repositoryPage';

import { searchRepository } from 'epics/repository';
import { fetchContributors } from 'epics/user';

import repositoryApi from 'api/repository';
import userApi from 'api/user';

export * from './actions';

export interface AppState {
  entities: {
    repository: RepositoryDomainState;
    user: UserDomainState;
  };
  ui: {
    repositoryPage: RepositoryPageState;
  };
}

export const rootReducer = combineReducers<AppState>({
  entities: combineReducers({
    repository: repositoryReducer,
    user: userReducer
  }),
  ui: combineReducers({
    repositoryPage: repositoryPageReducer
  })
});

export const rootEpic = combineEpics(
  searchRepository(repositoryApi),
  fetchContributors(userApi)
);