
export interface RepoOwner {
    login: string;
    avatar_url: string;
  }
  
  export interface Repo {
    id: number;
    name: string;
    description: string | null;
    stargazers_count: number;
    owner: RepoOwner;
  }
  