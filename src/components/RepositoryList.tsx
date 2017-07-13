import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Action } from 'state';
import { getRepositoryIds, getRepositorySearchTerm, getSelectedRepositoryId } from 'state/selectors';
import { repositorySearchTermChanged } from 'state/ui/repositoryPage/actions';
import Repository from './Repository';
import { Dispatch } from 'redux';

import './RepositoryList.css';

interface StateProps {
  nameFilter: string;
  repositoryIds: number[];
  selectedRepositoryId?: number;
}

interface DispatchProps {
  onSearchTermChanged(value: string): void;
}

export const component = (
  { nameFilter, repositoryIds, selectedRepositoryId, onSearchTermChanged }: StateProps & DispatchProps
) => (
  <div className="repository-list">
    <input type="text"
      className="repository-name-filter"
      placeholder="search a repository..."
      value={nameFilter}
      onChange={e => onSearchTermChanged(e.target.value)} />
    {repositoryIds.map(
      (repositoryId, idx) =>
        <Repository id={repositoryId} selected={selectedRepositoryId === repositoryId} key={idx} />
    )}
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(component);

function mapStateToProps(state: AppState): StateProps {
  return {
    nameFilter: getRepositorySearchTerm(state),
    repositoryIds: getRepositoryIds(state),
    selectedRepositoryId: getSelectedRepositoryId(state)
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
  return {
    onSearchTermChanged(value: string) {
      dispatch(repositorySearchTermChanged(value));
    }
  };
}
