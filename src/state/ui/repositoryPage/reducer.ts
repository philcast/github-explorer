import { RepositorySearchTermChanged, RepositorySelected } from './actions';
import { RepositoryPageState } from './model';
import { Reducer } from 'state/helpers';

const initialState = (): RepositoryPageState => ({
  searchTerm: '',
});

export const repositoryPageReducer: Reducer<RepositoryPageState> = (state = initialState(), action) => {
  switch (action.type) {
    case 'REPOSITORY_SEARCH_TERM_CHANGED': return onRepositorySearchTermChanged(state, action);
    case 'REPOSITORY_SELECTED': return onRepositorySelected(state, action);
    default: return state;
  }
};

function onRepositorySearchTermChanged(state: RepositoryPageState, { searchTerm }: RepositorySearchTermChanged) {
  return {
    ...state,
    searchTerm,
    selection: undefined
  };
}

function onRepositorySelected(state: RepositoryPageState, { id }: RepositorySelected) {
  return {
    ...state,
    selection: id
  };
}