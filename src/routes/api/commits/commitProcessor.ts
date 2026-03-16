import type { GitLabCommit, GitLabProject } from './types';

export interface ProcessedCommitRow {
  date: string;
  project: string;
  commits: string[];
}

export function processCommits(
  allProjectsCommits: { project: GitLabProject; commits: GitLabCommit[] }[],
  username: string
) {
  const commitsByDate: Record<string, { project: string; commits: string[] }[]> = {};
  let totalCommits = 0;
  let totalProjects = 0;

  const searchParts = username.toLowerCase().split(/[\.\-_]/);
  const usernameLower = username.toLowerCase();

  for (const { project, commits: projectCommits } of allProjectsCommits) {
    if (projectCommits.length > 0) {
      let projectHadValidCommits = false;

      for (const commit of projectCommits) {
        // Skip merge commits
        if (
          commit.title.trim().startsWith("Merge branch") ||
          (commit.parent_ids && commit.parent_ids.length > 1) ||
          commit.title.trim().startsWith("Merge pull request")
        ) {
          continue;
        }

        // Author verification
        const authorStr = (commit.author_name + " " + commit.author_email).toLowerCase();
        const isMatch = searchParts.some((p: string) => p.length >= 3 && authorStr.includes(p)) || authorStr.includes(usernameLower);

        if (!isMatch) {
          continue;
        }

        totalCommits++;
        projectHadValidCommits = true;

        const dateObj = new Date(commit.authored_date);
        const localDate = dateObj.toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' }); // YYYY-MM-DD

        if (!commitsByDate[localDate]) {
          commitsByDate[localDate] = [];
        }

        let projectEntry = commitsByDate[localDate].find(e => e.project === project.name);
        if (!projectEntry) {
          projectEntry = { project: project.name, commits: [] };
          commitsByDate[localDate].push(projectEntry);
        }

        projectEntry.commits.push(commit.title.trim());
      }

      if (projectHadValidCommits) {
        totalProjects++;
      }
    }
  }

  // Sort dates and build result
  const sortedDates = Object.keys(commitsByDate).sort();
  const rows: ProcessedCommitRow[] = [];

  for (const date of sortedDates) {
    for (const entry of commitsByDate[date]) {
      rows.push({
        date,
        project: entry.project,
        commits: entry.commits
      });
    }
  }

  return { totalCommits, totalProjects, rows };
}
