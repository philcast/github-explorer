export interface RepositoryPage {
  searchTerm: string;
  selection?: number;
}

export type RepositoryPageState = Readonly<RepositoryPage>;