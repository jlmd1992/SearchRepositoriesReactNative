export class Repository {
  id: number;
  repoName: string;
  fullNameRepo: string;
  ownerAvatarUrl: string;
  userName: string;
  starsCount: number;
  repoUrl: string;

  constructor(
    id: number,
    repoName: string,
    fullNameRepo: string,
    ownerAvatarUrl: string,
    userName: string,
    starsCount: number,
    repoUrl: string
  ) {
    this.id = id;
    this.repoName = repoName;
    this.fullNameRepo = fullNameRepo;
    this.ownerAvatarUrl = ownerAvatarUrl;
    this.userName = userName;
    this.starsCount = starsCount;
    this.repoUrl = repoUrl;
  }
}
