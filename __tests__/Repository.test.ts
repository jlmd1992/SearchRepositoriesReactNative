import { Repository } from '../src/models/Repository';

describe('Repository Class', () => {
  it('should create a repository instance correctly', () => {
    const repo = new Repository(1, 'Test Repo', 'Test Full Name', 'https://avatar.url', 'testuser', 5, 'https://repo.url');

    expect(repo.id).toBe(1);
    expect(repo.repoName).toBe('Test Repo');
    expect(repo.fullNameRepo).toBe('Test Full Name');
    expect(repo.ownerAvatarUrl).toBe('https://avatar.url');
    expect(repo.userName).toBe('testuser');
    expect(repo.starsCount).toBe(5);
    expect(repo.repoUrl).toBe('https://repo.url');
  });
});
