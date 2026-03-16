<script lang="ts">
  import "../app.css";
  import type { PageData } from "./$types";
  import Header from "$lib/components/Header.svelte";
  import FormCard from "$lib/components/FormCard.svelte";
  import ResultsTable from "$lib/components/ResultsTable.svelte";
  import EmptyState from "$lib/components/EmptyState.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { fetchCommitsService, downloadCSVService } from "$lib/services/timesheetService";
  import type { CommitRow } from "$lib/services/timesheetService";

  let { data }: { data: PageData } = $props();

  // ─── Helpers ──────────────────────────────────────────────────────────────
  function firstDayOfLastMonth(): Date {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - 1);
    return d;
  }

  function formatDateInput(d: Date): string {
    return d.toLocaleDateString("en-CA"); // YYYY-MM-DD
  }

  // ─── State ────────────────────────────────────────────────────────────────
  let username = $state("");
  let dateFrom = $state(formatDateInput(firstDayOfLastMonth()));
  let dateTo = $state(formatDateInput(new Date()));

  let loading = $state(false);
  let error = $state("");
  let resultInfo = $state("");
  let rows = $state<CommitRow[]>([]);

  // ─── Handlers ─────────────────────────────────────────────────────────────
  async function handleFetch() {
    if (!username.trim()) {
      error = "Username wajib diisi.";
      return;
    }
    if (!dateFrom || !dateTo) {
      error = "Rentang tanggal wajib diisi.";
      return;
    }
    if (dateFrom > dateTo) {
      error = "Tanggal mulai tidak boleh melebihi tanggal akhir.";
      return;
    }

    loading = true;
    error = "";
    resultInfo = "";
    rows = [];

    try {
      const result = await fetchCommitsService(username, dateFrom, dateTo);
      rows = result.rows;
      resultInfo = `Selesai. ${result.totalCommits} commit ditemukan dari ${result.totalProjects} project.`;
    } catch (e: any) {
      error = e.message || "Gagal terhubung ke server.";
    } finally {
      loading = false;
    }
  }

  function handleDownload() {
    downloadCSVService(rows, username, dateFrom, dateTo);
  }
</script>

<svelte:head>
  <title>GitLab Timesheet Generator</title>
</svelte:head>

<main class="page-wrapper">
  <div class="container">
    <Header gitlabUrl={data.gitlabUrl} tokenValid={data.tokenValid} />

    <FormCard
      bind:username
      bind:dateFrom
      bind:dateTo
      {loading}
      tokenValid={data.tokenValid}
      {error}
      {resultInfo}
      onFetch={handleFetch}
    />

    {#if rows.length > 0}
      <ResultsTable {rows} onDownload={handleDownload} />
    {/if}

    <EmptyState {loading} rowsCount={rows.length} {resultInfo} {username} />

    <Footer />
  </div>
</main>

<style>
  .page-wrapper {
    min-height: 100vh;
    padding: 2rem 1rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .container {
    width: 100%;
    max-width: 960px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
</style>
