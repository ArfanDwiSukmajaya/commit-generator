import { GITLAB_TOKEN, GITLAB_URL } from '$env/static/private';
import type { GitLabCommit, GitLabProject } from './types';

const GITLAB_API = `${GITLAB_URL}/api/v4`;
const headers = {
  'PRIVATE-TOKEN': GITLAB_TOKEN,
  'Content-Type': 'application/json'
};

export async function fetchAllProjects(): Promise<GitLabProject[]> {
  let allProjects: GitLabProject[] = [];
  let projectPage = 1;

  while (true) {
    const projRes = await fetch(
      `${GITLAB_API}/projects?membership=true&per_page=100&page=${projectPage}&simple=true`,
      { headers }
    );

    if (!projRes.ok) {
      const errText = await projRes.text();
      throw new Error(`Gagal mengambil projects: ${projRes.status} - ${errText}`);
    }

    const projects: GitLabProject[] = await projRes.json();
    allProjects = [...allProjects, ...projects];
    if (projects.length < 100) break;
    projectPage++;
  }

  return allProjects;
}

export async function fetchProjectCommits(projectId: number, since: string, until: string): Promise<GitLabCommit[]> {
  let projectCommits: GitLabCommit[] = [];
  let commitPage = 1;

  while (true) {
    const commitRes = await fetch(
      `${GITLAB_API}/projects/${projectId}/repository/commits?since=${since}&until=${until}&all=true&per_page=100&page=${commitPage}`,
      { headers }
    );
    if (!commitRes.ok) break;

    const commits: GitLabCommit[] = await commitRes.json();
    projectCommits = [...projectCommits, ...commits];
    if (commits.length < 100) break;
    commitPage++;
  }

  return projectCommits;
}
