import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Action } from 'state';
import { getRepository, getUser } from 'state/selectors';
import { repositorySelected } from 'state/ui/repositoryPage';
import { Dispatch } from 'redux';
import Contributor from './Contributor';

import './Repository.css';

interface OwnProps {
  id: number;
  selected: boolean;
}

interface StateProps {
  name: string;
  fullName: string;
  description: string;
  homePage: string;
  ownerLogin: string;
  ownerAvatarUrl: string;
  contributors: number[];
  stargazers: number;
  watchers: number;
  language: string;
}

interface DispatchProps {
  onRepositorySelected(): void;
}

export interface RepositoryProps extends OwnProps, StateProps, DispatchProps {}

export const component = (props: OwnProps & StateProps & DispatchProps) => (
  <div className="repository" onClick={props.onRepositorySelected}>
    <img className="repository-avatar" src={`${props.ownerAvatarUrl}&size=150`} />
    <div className="repository-infos">
      <div className="repository-infos-header">
        <span className="repository-name">{props.fullName}</span>
        <div className="repository-stats">
          <span className="icon star-icon" />
          <span>{props.stargazers}</span>
        </div>
      </div>
      <span className="repository-description">{props.description}</span>
      {
        props.selected
        ? <div className="repository-contributors">
            <span className="contributors-label">Contributors:</span>
            <div className="contributors-list">
              {props.contributors.map(contributorId => <Contributor id={contributorId} />)}
            </div>
          </div>
        : []
      }
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(component);

function mapStateToProps(state: AppState, { id }: OwnProps): StateProps {
  const repository = getRepository(state, id);
  const owner = getUser(state, repository.owner);
  console.log('owner', owner);
  return {
    ...repository,
    ownerLogin: owner.login,
    ownerAvatarUrl: owner.avatarUrl,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>, { id }: OwnProps): DispatchProps {
  return {
    onRepositorySelected() {
      dispatch(repositorySelected(id));
    }
  };
}