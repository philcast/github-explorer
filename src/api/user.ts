import { User } from 'state/entities/user';
import { UserApi } from 'epics/user';
import { ajax } from 'rx';

interface UserDto {
  id: number;
  login: string;
  avatar_url: string;
}

const api: UserApi = {
  fetchContributors: function (ownerLogin: string, repositoryName: string) {
    return ajax.getJSON<UserDto[]>(`https://api.github.com/repos/${ownerLogin}/${repositoryName}/contributors`)
      .map(normalize);
  },
  timeout: 5000
};

export default api;

function normalize(contributors: UserDto[]): User[] {
  return contributors.map(contributor => ({
    id: contributor.id,
    login: contributor.login,
    avatarUrl: contributor.avatar_url
  }));
}