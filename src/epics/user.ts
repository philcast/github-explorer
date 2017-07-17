import { Epic } from 'redux-observable';
import { Observable, IScheduler } from 'rx';
import { AppState, Action, appCrashed } from 'state';
import { RepositorySelected } from 'state/ui/repositoryPage';
import { User, contributorsLoaded } from 'state/entities/user';
import { getRepository, getUser } from 'state/selectors';

export interface UserApi {
  fetchContributors: (ownerLogin: string, repositoryName: string) => Observable<User[]>;
  timeout: number;
}

interface Store {
  getState(): AppState;
}

export function fetchContributors(
  api: UserApi,
  scheduler?: IScheduler
): Epic<Action, AppState> {
  return (action$, store: Store) =>
    action$
      .ofType<RepositorySelected>('REPOSITORY_SELECTED')
      .map(({ id }) => {
        const state = store.getState();
        const repository = getRepository(state, id);
        const { login } = getUser(state, repository.owner);
        return { ownerLogin: login, repositoryId: id, repositoryName: repository.name };
      })
      .distinctUntilChanged()
      .filter(e => !!e)
      .flatMap(({ ownerLogin, repositoryId, repositoryName }) => api.fetchContributors(ownerLogin, repositoryName)
        // Do not break the action input stream, use a substream that will be flattened
        .timeout(api.timeout)
        .map(users => contributorsLoaded(repositoryId, users))
        .catch(err => [appCrashed()])
      );
}
