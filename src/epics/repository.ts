import { Epic } from 'redux-observable';
import { Observable, IScheduler } from 'rx';
import { Repository, repositoriesLoaded } from 'state/entities/repository';
import { AppState, Action, appCrashed } from 'state';
import { RepositorySearchTermChanged } from 'state/ui/repositoryPage';
import { User } from 'state/entities/user';

export interface NormalizedRepositories {
  repositories: Repository[];
  owners: User[];
}

export interface RepositoryApi {
  search: (name: string) => Observable<NormalizedRepositories>;
  timeout: number;
}

export function searchRepository(
  api: RepositoryApi,
  scheduler?: IScheduler
): Epic<Action, AppState> {
  return (action$, _) =>
    action$
      .ofType<RepositorySearchTermChanged>('REPOSITORY_SEARCH_TERM_CHANGED')
      .map((e: RepositorySearchTermChanged) => e.searchTerm)
      .debounceTime(500)
      .distinctUntilChanged()
      .filter(e => !!e)
      .flatMap(searchTerm => api.search(searchTerm)
        // Do not break the action input stream, use a substream that will be flattened
        .timeout(api.timeout)
        .map(({ repositories, owners }) => repositoriesLoaded(repositories, owners))
        .catch(err => [appCrashed()])
      );
}
