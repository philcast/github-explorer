import { RepositoryDomainState, repositoryReducer } from 'state/entities/repository';
import { userReducer } from 'state/entities/user';
import { combineReducers } from 'redux';

interface EntitiesDomain {
  repository: Readonly<RepositoryDomainState>;
}

export type EntitiesDomainState = Readonly<EntitiesDomain>;

export const entitiesReducer = combineReducers({
  repository: repositoryReducer,
  user: userReducer
});