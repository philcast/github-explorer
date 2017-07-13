import { RepositoriesLoaded } from './actions';
import { Repository, RepositoryDomainState } from './model';
import { StateMap, Reducer } from 'state/helpers';
import { ContributorsLoaded } from 'state/entities/user';

const initialState = (): RepositoryDomainState => ({
  byId: {},
  allIds: []
});

export const repositoryReducer: Reducer<RepositoryDomainState> = (state = initialState(), action) => {
  switch (action.type) {
    case 'REPOSITORIES_LOADED': return onRepositoriesLoaded(action);
    case 'CONTRIBUTORS_LOADED': return onContributorsLoaded(state, action);
    default: return state;
  }
};

function onRepositoriesLoaded({ repositories }: RepositoriesLoaded): RepositoryDomainState {
  const byId: StateMap<Repository> = {};
  repositories.forEach(repo => byId[repo.id] = repo);
  return {
    byId,
    allIds: repositories.map(repo => repo.id)
  };
}

function onContributorsLoaded(
  state: RepositoryDomainState, { repositoryId, contributors }: ContributorsLoaded
): RepositoryDomainState {
  const repository = state.byId[repositoryId];
  console.log('updating contributors', contributors.map(c => c.id));

  return {
    ...state,
    byId: {
      ...state.byId,
      [repositoryId]: {
        ...repository,
        contributors: contributors.map(user => user.id)
      }
    }
  };
}