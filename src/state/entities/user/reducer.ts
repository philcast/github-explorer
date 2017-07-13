import { ContributorsLoaded } from './actions';
import { UserDomainState } from './model';
import { Reducer } from 'state/helpers';
import { RepositoriesLoaded } from 'state/entities/repository';

export const userReducer: Reducer<UserDomainState> = (state = {}, action) => {
  switch (action.type) {
    case 'CONTRIBUTORS_LOADED': return onContributorsLoaded(state, action);
    case 'REPOSITORIES_LOADED': return onRepositoriesLoaded(state, action);
    default: return state;
  }
};

function onRepositoriesLoaded(state: UserDomainState, { owners }: RepositoriesLoaded): UserDomainState {
  const byId: UserDomainState = {...state};
  owners.forEach(owner => byId[owner.id] = owner);
  return byId;
}

function onContributorsLoaded(state: UserDomainState, { contributors }: ContributorsLoaded): UserDomainState {
  const byId: UserDomainState = {...state};
  contributors.forEach(user => byId[user.id] = user);
  return byId;
}