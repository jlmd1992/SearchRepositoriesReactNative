import { getRepositoriesUseCase } from '../src/usecases/GetRepositoriesUseCase';
import { fetchRepositories } from '../src/repositories/GithubRepository';
import { Repository } from '../src/models/Repository';

jest.mock('../src/repositories/githubRepository', () => ({
  fetchRepositories: jest.fn(),
}));

describe('getRepositoriesUseCase', () => {
  it('should fetch repositories and return them', async () => {
    const mockRepositories: Repository[] = [
      new Repository(1, 'Repo 1', 'Full Repo 1', 'http://avatar1.com', 'user1', 10, 'http://repo1.com'),
      new Repository(2, 'Repo 2', 'Full Repo 2', 'http://avatar2.com', 'user2', 20, 'http://repo2.com'),
    ];

    (fetchRepositories as jest.Mock).mockResolvedValue(mockRepositories);

    const query = 'test';
    const result = await getRepositoriesUseCase(query);

    expect(fetchRepositories).toHaveBeenCalledWith(query);
    
    expect(result).toEqual(mockRepositories);
  });

  it('should handle errors thrown by fetchRepositories', async () => {
    const query = 'test';
    
    (fetchRepositories as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(getRepositoriesUseCase(query)).rejects.toThrow('Network error');
  });
});
