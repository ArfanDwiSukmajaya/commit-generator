<script lang="ts">
  let {
    username = $bindable(),
    dateFrom = $bindable(),
    dateTo = $bindable(),
    loading,
    tokenValid,
    error,
    resultInfo,
    onFetch
  } = $props<{
    username: string;
    dateFrom: string;
    dateTo: string;
    loading: boolean;
    tokenValid: boolean;
    error: string;
    resultInfo: string;
    onFetch: () => void;
  }>();

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && !loading) onFetch();
  }
</script>

<section class="form-card">
  <!-- Username -->
  <div class="input-group">
    <label for="username" class="sr-only">Username GitLab</label>
    <div class="input-wrapper">
      <span class="input-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </span>
      <input
        id="username"
        type="text"
        class="input"
        placeholder="Masukkan username GitLab (contoh: sri.muhsini)"
        bind:value={username}
        onkeydown={handleKeydown}
        disabled={loading}
      />
    </div>
  </div>

  <!-- Date Range -->
  <div class="date-row">
    <div class="date-group">
      <label for="date-from" class="label">Dari</label>
      <div class="input-wrapper">
        <span class="input-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </span>
        <input id="date-from" type="date" class="input" bind:value={dateFrom} disabled={loading} />
      </div>
    </div>

    <div class="date-group">
      <label for="date-to" class="label">Sampai</label>
      <div class="input-wrapper">
        <span class="input-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </span>
        <input id="date-to" type="date" class="input" bind:value={dateTo} disabled={loading} />
      </div>
    </div>

    <button
      id="btn-fetch"
      class="btn btn-primary"
      onclick={onFetch}
      disabled={loading || !tokenValid}
      title={!tokenValid ? "Token GitLab tidak valid" : ""}
    >
      {#if loading}
        <svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M21 12a9 9 0 11-6.219-8.56" />
        </svg>
        Memuat...
      {:else}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
        </svg>
        Tarik Data
      {/if}
    </button>
  </div>

  <!-- Status Messages -->
  {#if error}
    <div class="alert alert-error" role="alert">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {error}
    </div>
  {/if}

  {#if resultInfo && !loading}
    <div class="result-info">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      {resultInfo}
    </div>
  {/if}

  {#if loading}
    <div class="loading-bar-wrap">
      <div class="loading-bar"></div>
    </div>
  {/if}
</section>

<style>
  .form-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: var(--shadow-md);
    transition:
      border-color var(--transition-base),
      box-shadow var(--transition-base);
  }
  .form-card:focus-within {
    border-color: rgba(124, 58, 237, 0.4);
    box-shadow: var(--shadow-md), var(--shadow-glow);
  }

  .input-group {
    width: 100%;
  }

  .label {
    display: block;
    font-size: var(--font-size-xs);
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 0.4rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .input-wrapper {
    position: relative;
    width: 100%;
  }

  .input-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    pointer-events: none;
    display: flex;
    align-items: center;
  }

  .input {
    width: 100%;
    padding: 0.75rem 0.875rem 0.75rem 2.5rem;
    background: var(--bg-input);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-family: var(--font-family);
    font-size: var(--font-size-base);
    transition:
      border-color var(--transition-fast),
      box-shadow var(--transition-fast);
    outline: none;
    -webkit-appearance: none;
    appearance: none;
  }
  .input:focus {
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
  }
  .input:hover:not(:focus):not(:disabled) {
    border-color: var(--border-hover);
  }
  .input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .input::placeholder {
    color: var(--text-muted);
  }
  .input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(0.5);
    cursor: pointer;
  }

  .date-row {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 1rem;
    align-items: flex-end;
  }

  .date-group {
    display: flex;
    flex-direction: column;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-md);
    font-family: var(--font-family);
    font-size: var(--font-size-sm);
    font-weight: 700;
    cursor: pointer;
    border: none;
    transition: all var(--transition-fast);
    white-space: nowrap;
    position: relative;
    overflow: hidden;
  }
  .btn::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0);
    transition: background var(--transition-fast);
  }
  .btn:hover::after {
    background: rgba(255, 255, 255, 0.06);
  }
  .btn:active::after {
    background: rgba(0, 0, 0, 0.1);
  }

  .btn-primary {
    background: linear-gradient(135deg, #7c3aed, #6d28d9);
    color: white;
    box-shadow: 0 2px 8px rgba(124, 58, 237, 0.35);
  }
  .btn-primary:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(124, 58, 237, 0.45);
  }
  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .alert {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    animation: slideIn 0.2s ease;
  }

  .alert-error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.25);
    color: #f87171;
  }

  .result-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: var(--font-size-sm);
    color: var(--text-success);
    padding: 0.5rem 0;
    animation: slideIn 0.2s ease;
  }

  .loading-bar-wrap {
    height: 3px;
    background: var(--border-color);
    border-radius: 2px;
    overflow: hidden;
  }

  .loading-bar {
    height: 100%;
    width: 40%;
    background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
    animation: shimmer 1.4s ease-in-out infinite;
    border-radius: 2px;
  }

  @keyframes shimmer {
    0% { transform: translateX(-200%); }
    100% { transform: translateX(400%); }
  }

  .spinner {
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  @media (max-width: 640px) {
    .date-row {
      grid-template-columns: 1fr 1fr;
    }
    .btn-primary {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 480px) {
    .date-row {
      grid-template-columns: 1fr;
    }
  }
</style>
