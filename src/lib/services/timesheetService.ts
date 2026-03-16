export interface CommitRow {
  date: string;
  project: string;
  commits: string[];
}

export function formatDateDisplay(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function fetchCommitsService(username: string, dateFrom: string, dateTo: string) {
  const res = await fetch("/api/commits", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username.trim(), dateFrom, dateTo }),
  });
  const result = await res.json();

  if (!res.ok || result.error) {
    throw new Error(result.error || "Terjadi kesalahan.");
  }

  return result;
}

export function downloadCSVService(rows: CommitRow[], username: string, dateFrom: string, dateTo: string) {
  if (!rows.length) return;

  const BOM = "\uFEFF";
  const header = "Tanggal,Project,Commit\n";
  const csvRows = rows.map((row) => {
    const dateStr = formatDateDisplay(row.date);
    const project = `"${row.project.replace(/"/g, '""')}"`;
    const commits = `"${row.commits
      .map((c) => `- ${c}`)
      .join("\n")
      .replace(/"/g, '""')}"`;
    return `${dateStr},${project},${commits}`;
  });

  const csvContent = BOM + header + csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `timesheet_${username}_${dateFrom}_${dateTo}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
