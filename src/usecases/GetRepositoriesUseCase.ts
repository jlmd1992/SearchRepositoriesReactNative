import { fetchRepositories } from '../repositories/GithubRepository';
import { Repository } from '../models/Repository';

export const getRepositoriesUseCase = async (query: string): Promise<Repository[]> => {
  return await fetchRepositories(query);
};
