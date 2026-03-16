<script lang="ts">
  let { loading, rowsCount, resultInfo, username } = $props<{
    loading: boolean;
    rowsCount: number;
    resultInfo: string;
    username: string;
  }>();
</script>

{#if !loading && rowsCount === 0 && !resultInfo}
  <div class="empty-state">
    <div class="empty-icon">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    </div>
    <p class="empty-title">Belum Ada Data</p>
    <p class="empty-desc">
      Masukkan username dan rentang tanggal, lalu klik <strong>Tarik Data</strong> untuk melihat commit.
    </p>
  </div>
{/if}

{#if !loading && rowsCount === 0 && resultInfo}
  <div class="empty-state">
    <div class="empty-icon" style="color: var(--accent-warning)">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    </div>
    <p class="empty-title">Tidak Ditemukan</p>
    <p class="empty-desc">
      Tidak ada commit ditemukan untuk <strong>{username}</strong> pada rentang tanggal yang dipilih.
    </p>
  </div>
{/if}

<style>
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 3rem 2rem;
    background: var(--bg-card);
    border: 1px dashed var(--border-color);
    border-radius: var(--radius-lg);
    text-align: center;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .empty-icon { color: var(--text-muted); opacity: 0.6; }
  .empty-title { font-size: var(--font-size-lg); font-weight: 700; color: var(--text-primary); }
  .empty-desc { font-size: var(--font-size-sm); color: var(--text-secondary); max-width: 380px; line-height: 1.6; }
</style>
