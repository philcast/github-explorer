import { AppState } from 'state';
import { Repository } from 'state/entities/repository';
import { User } from 'state/entities/user';

export const getRepositorySearchTerm = (state: AppState): string => state.ui.repositoryPage.searchTerm;

export const getRepositoryIds = (state: AppState): number[] => state.entities.repository.allIds;

export const getRepository = (state: AppState, id: number): Repository => state.entities.repository.byId[id];

export const getUser = (state: AppState, id: number): User => state.entities.user[id];

export const getSelectedRepositoryId = (state: AppState): number | undefined => state.ui.repositoryPage.selection;
