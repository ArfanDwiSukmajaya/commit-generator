<script lang="ts">
  let { gitlabUrl, tokenValid } = $props<{ gitlabUrl: string; tokenValid: boolean }>();
</script>

<header class="header">
  <div class="header-title">
    <div class="header-icon">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 01-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 014.82 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0118.6 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.51L23 13.45a.84.84 0 01-.35.94z"
          fill="#FC6D26"
        />
      </svg>
    </div>
    <h1>GitLab Timesheet Generator</h1>
  </div>
  <div class="header-meta">
    <a
      href={gitlabUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="meta-link"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
      {gitlabUrl}
    </a>
    <span class="token-badge" class:valid={tokenValid} class:invalid={!tokenValid}>
      {#if tokenValid}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        Token: valid
      {:else}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
        Token: invalid
      {/if}
    </span>
  </div>
</header>

<style>
  .header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .header-title {
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }

  .header-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: rgba(252, 109, 38, 0.1);
    border-radius: var(--radius-md);
    border: 1px solid rgba(252, 109, 38, 0.2);
  }

  h1 {
    font-size: var(--font-size-2xl);
    font-weight: 800;
    background: linear-gradient(135deg, #58a6ff 0%, #a78bfa 50%, #34d399 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
  }

  .header-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    padding-left: 2px;
  }

  .meta-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: var(--font-size-xs);
    color: var(--text-secondary);
    text-decoration: none;
    transition: color var(--transition-fast);
  }
  .meta-link:hover {
    color: var(--text-accent);
  }

  .token-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: var(--font-size-xs);
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 999px;
  }
  .token-badge.valid {
    background: rgba(34, 197, 94, 0.1);
    color: #4ade80;
    border: 1px solid rgba(34, 197, 94, 0.25);
  }
  .token-badge.invalid {
    background: rgba(239, 68, 68, 0.1);
    color: #f87171;
    border: 1px solid rgba(239, 68, 68, 0.25);
  }

  @media (max-width: 640px) {
    h1 {
      font-size: var(--font-size-xl);
    }
  }
</style>
