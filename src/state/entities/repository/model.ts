import { StateMap } from 'state/helpers';

export interface Repository {
  id: number;
  name: string;
  fullName: string;
  description: string;
  homePage: string;
  owner: number;
  contributors: number[];
  stargazers: number;
  watchers: number;
  language: string;
}

interface RepositoryDomain {
  byId: StateMap<Repository>;
  allIds: number[];
}

export type RepositoryDomainState = Readonly<RepositoryDomain>;