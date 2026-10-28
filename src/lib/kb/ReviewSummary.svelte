<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { uniqueById, groupByCause, readAs, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';
  const merged = uniqueById(reports as Report[]).filter(r=>r.mergedInto===4471);
  const groups = groupByCause(merged,tenantOf);
  const duplicateRows = reports.length-uniqueById(reports as Report[]).length;
  const changedTags = groups.reduce((n,g)=>n+g.reports.filter(r=>r.meta.intakeTag!==g.cause).length,0);
  const backlog = merged.filter(r=>r.mergedAt?.startsWith('2026-07-02'));
  const earlier = backlog.filter(r=>r.receivedAt.slice(0,10)<'2026-07-02');
</script>
<p><strong>{merged.length} distinct reports · {groups.length} causes.</strong> The export contains {reports.length} rows; {duplicateRows} overlapping rows are removed by report ID before counting.</p>
<p>{changedTags} intake tags disagree with the tenant-and-channel classifier. The browser locale and subject are not the cause.</p>
<p>On 2 July, {backlog.length} reports were merged, including {earlier.length} received on earlier days. The merge spike represents accumulated triage work, not a sudden start of the incident. Reports already arrived in April.</p>
{#each groups as g (g.cause)}
  {#if readAs(g,notes.oneDayMove)}
    <p><strong>Unresolved observation:</strong> {readAs(g,notes.oneDayMove)} reports read as a one-day move, but remain within the {g.cause} count under the supplied classifier. These are not additional reports or a confirmed third cause. Investigate their original timestamps, timezone, and date-only conversions before changing their classification.</p>
  {/if}
{/each}
<details><summary>Report IDs requiring follow-up</summary><p>{notes.oneDayMove.join(', ')}</p></details>
