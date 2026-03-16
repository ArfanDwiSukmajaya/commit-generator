<script lang="ts">
  import { formatDateDisplay } from '$lib/services/timesheetService';
  import type { CommitRow } from '$lib/services/timesheetService';

  let { rows, onDownload } = $props<{
    rows: CommitRow[];
    onDownload: () => void;
  }>();
</script>

<section class="table-section">
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th class="col-date">Tanggal</th>
          <th class="col-project">Project</th>
          <th class="col-commit">Commit</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as row, i}
          <tr class:alt={i % 2 === 1}>
            <td class="col-date">
              <span class="date-badge">{formatDateDisplay(row.date)}</span>
            </td>
            <td class="col-project">
              <span class="project-badge">{row.project}</span>
            </td>
            <td class="col-commit">
              <ul class="commit-list">
                {#each row.commits as msg}
                  <li class="commit-item">
                    <span class="commit-bullet">-</span>
                    <span class="commit-msg">{msg}</span>
                  </li>
                {/each}
              </ul>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- Download Button -->
  <button id="btn-download" class="btn btn-success btn-download" onclick={onDownload}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
    Download CSV for Excel
  </button>
</section>

<style>
  .table-section {
    display: flex;
    flex-direction: column;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .table-wrapper {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-md);
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-sm);
  }

  .table thead {
    background: var(--bg-table-header);
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .table thead tr {
    border-bottom: 2px solid var(--border-color);
  }

  .table th {
    padding: 0.875rem 1.25rem;
    text-align: left;
    font-weight: 700;
    font-size: var(--font-size-xs);
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .table tbody tr {
    border-bottom: 1px solid var(--border-color);
    transition: background var(--transition-fast);
  }

  .table tbody tr:last-child {
    border-bottom: none;
  }

  .table tbody tr:hover {
    background: var(--bg-card-hover);
  }

  .table tbody tr.alt {
    background: var(--bg-table-row-alt);
  }

  .table tbody tr.alt:hover {
    background: var(--bg-card-hover);
  }

  .table td {
    padding: 1rem 1.25rem;
    vertical-align: top;
  }

  /* Column Widths */
  .col-date { width: 160px; }
  .col-project { width: 220px; }
  .col-commit { min-width: 0; }

  .date-badge {
    font-weight: 500;
    color: var(--text-primary);
  }

  .project-badge {
    display: inline-block;
    font-family: "JetBrains Mono", "Fira Code", monospace;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--text-accent);
    background: rgba(88, 166, 255, 0.08);
    border: 1px solid rgba(88, 166, 255, 0.15);
    padding: 3px 8px;
    border-radius: 6px;
  }

  .commit-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .commit-item {
    display: flex;
    gap: 6px;
    align-items: baseline;
    font-size: 0.8rem;
    line-height: 1.5;
  }

  .commit-bullet {
    color: var(--text-muted);
    flex-shrink: 0;
    font-weight: 600;
  }

  .commit-msg {
    color: var(--text-secondary);
    font-family: "JetBrains Mono", "Fira Code", monospace;
    font-size: 0.775rem;
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
  .btn:hover::after { background: rgba(255, 255, 255, 0.06); }
  .btn:active::after { background: rgba(0, 0, 0, 0.1); }

  .btn-success {
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: white;
    box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
  }
  .btn-success:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(34, 197, 94, 0.4);
  }

  .btn-download {
    width: 100%;
    padding: 1rem;
    font-size: var(--font-size-base);
    border-radius: var(--radius-md);
    margin-top: 0.75rem;
    letter-spacing: 0.01em;
  }
</style>
