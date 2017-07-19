import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from 'state';
import { getUser } from 'state/selectors';

import './Contributor.css';

interface OwnProps {
  id: number;
}

interface StateProps {
  login: string;
  avatarUrl: string;
}

export interface UserProps extends OwnProps, StateProps {}

export const component = ({login, avatarUrl}: UserProps) => (
  <div className="contributor">
    <img className="contributor-avatar" src={`${avatarUrl}&size=100`} />
    <span className="contributor-login">{login}</span>
  </div>
);

export default connect(mapStateToProps)(component);

function mapStateToProps(state: AppState, { id }: OwnProps): StateProps {
  const {login, avatarUrl} = getUser(state, id);
  return {
    login,
    avatarUrl
  };
}
