import { RepositoryApi, NormalizedRepositories } from 'epics/repository';
import { ajax } from 'rx';

interface ResponseDto {
  items: RepositoryDto[];
}

interface RepositoryDto {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  owner: OwnerDto;
  stargazers_count: number;
  watchers_count: number;
  language: string;
}

interface OwnerDto {
  id: number;
  login: string;
  avatar_url: string;
}

const api: RepositoryApi = {
  search: function (name: string) {
    return ajax.getJSON<ResponseDto>(`https://api.github.com/search/repositories?q=${name}&sort=stars&order=desc`)
      .map(normalize);
  },
  timeout: 5000
};

export default api;

function normalize(response: ResponseDto): NormalizedRepositories {
  return {
    repositories: response.items.map(item => ({
      id: item.id,
      name: item.name,
      fullName: item.full_name,
      description: item.description,
      homePage: item.html_url,
      owner: item.owner.id,
      contributors: [],
      stargazers: item.stargazers_count,
      watchers: item.watchers_count,
      language: item.language
    })),
    owners: response.items.map(({ owner }) => ({
      id: owner.id,
      login: owner.login,
      avatarUrl: owner.avatar_url
    }))
  };
}