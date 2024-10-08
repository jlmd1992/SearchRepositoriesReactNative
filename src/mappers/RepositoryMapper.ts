import { Repository } from '../models/Repository';

interface RepositoryResponse {
  id: number;
  name: string;
  full_name: string;
  owner: {
    avatar_url: string;
    login: string;
  };
  stargazers_count: number;
  html_url: string;
}

export const mapToRepositoryModel = (data: RepositoryResponse): Repository => {
  return new Repository(
    data.id,
    data.name,
    data.full_name,
    data.owner.avatar_url,
    data.owner.login,
    data.stargazers_count,
    data.html_url
  );
};
