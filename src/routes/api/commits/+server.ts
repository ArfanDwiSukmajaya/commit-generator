import { GITLAB_URL } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { fetchAllProjects, fetchProjectCommits } from './gitlab';
import { processCommits } from './commitProcessor';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    const { username, dateFrom, dateTo } = body;

    if (!username || !dateFrom || !dateTo) {
      return json({ error: 'Username, tanggal mulai, dan tanggal akhir wajib diisi.' }, { status: 400 });
    }

    const since = new Date(dateFrom + 'T00:00:00+07:00').toISOString();
    const until = new Date(dateTo + 'T23:59:59+07:00').toISOString();

    const allProjects = await fetchAllProjects();

    const allProjectsWithCommits = await Promise.all(
      allProjects.map(async (project) => {
        const commits = await fetchProjectCommits(project.id, since, until);
        return { project, commits };
      })
    );

    const { totalCommits, totalProjects, rows } = processCommits(allProjectsWithCommits, username);

    return json({
      success: true,
      totalCommits,
      totalProjects,
      rows,
      gitlabUrl: GITLAB_URL
    });
  } catch (err: any) {
    console.error('API Error:', err);
    return json({ error: `Terjadi kesalahan server: ${err.message || err}` }, { status: 500 });
  }
};
