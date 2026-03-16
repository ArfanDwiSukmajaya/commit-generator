import { GITLAB_URL, GITLAB_TOKEN } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Validate token on page load
  let tokenValid = false;
  try {
    const res = await fetch(`${GITLAB_URL}/api/v4/user`, {
      headers: { 'PRIVATE-TOKEN': GITLAB_TOKEN }
    });
    tokenValid = res.ok;
  } catch {
    tokenValid = false;
  }

  return {
    gitlabUrl: GITLAB_URL,
    tokenValid
  };
};
