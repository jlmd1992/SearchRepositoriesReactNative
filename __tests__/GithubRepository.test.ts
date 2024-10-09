import { fetchRepositories } from '../src/repositories/GithubRepository';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('Github Repository API', () => {
  const mock = new MockAdapter(axios);
  const mockData = {
    items: [
      {
        id: 1,
        name: 'Test Repo',
        full_name: 'Test User/Test Repo',
        owner: { avatar_url: 'https://avatar.url' },
        stargazers_count: 5,
        html_url: 'https://repo.url',
      },
    ],
  };

  beforeEach(() => {
    mock.reset();
  });

  it('should fetch repositories correctly', async () => {
    mock.onGet('https://api.github.com/search/repositories', { params: { q: 'jlmd', sort: 'stars', per_page: 20 } })
      .reply(200, mockData);

    const result = await fetchRepositories('jlmd');
    
    expect(result).toHaveLength(1);
    expect(result[0].repoName).toBe('Test Repo');
  });

  it('should handle errors correctly', async () => {
    mock.onGet('https://api.github.com/search/repositories').reply(403);

    await expect(fetchRepositories('jlmd')).rejects.toThrow('Error: Request failed with status code 403');
  });
});
