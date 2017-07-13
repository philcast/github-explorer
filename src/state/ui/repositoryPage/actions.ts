export type RepositoryPageAction =
  | RepositorySearchTermChanged
  | RepositorySelected
  ;

export interface RepositorySearchTermChanged {
  type: 'REPOSITORY_SEARCH_TERM_CHANGED';
  searchTerm: string;
}

export const repositorySearchTermChanged = (searchTerm: string): RepositorySearchTermChanged => ({
  type: 'REPOSITORY_SEARCH_TERM_CHANGED',
  searchTerm
});

export interface RepositorySelected {
  type: 'REPOSITORY_SELECTED';
  id: number;
}

export const repositorySelected = (id: number): RepositorySelected => ({
  type: 'REPOSITORY_SELECTED',
  id
});
