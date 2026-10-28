import fs from 'node:fs';
import assert from 'node:assert/strict';
import { uniqueById, groupByCause, readAs } from '../src/lib/kb/causes.ts';
const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const base = 'src/lib/data/';
const tenants = fs.readdirSync(base+'tenants').map(f => read(base+'tenants/'+f));
const rows = read(base+'reports-4471.json');
const reports = uniqueById(rows).filter(r => r.mergedInto === 4471);
const groups = groupByCause(reports, r => tenants.find(t => t.handle === r.tenant));
assert.equal(groups.reduce((n,g)=>n+g.reports.length,0), reports.length);
assert(groups.every(g => g.cause !== 'unplaced'), 'Unplaced reports require review');
const notes = read(base+'desk-notes.json');
const summary = {
  source: 'kb-export-267efc5e.zip', rawRows: rows.length, uniqueReports: reports.length,
  duplicateRows: rows.length-uniqueById(rows).length,
  groups: groups.map(g=>({...g, reports:g.reports.map(r=>r.id), count:g.reports.length, oneDayMove:readAs(g,notes.oneDayMove)})),
  monthly: Object.groupBy(reports,r=>r.receivedAt.slice(0,7)),
  mergeDays: Object.fromEntries(Object.entries(Object.groupBy(reports,r=>r.mergedAt.slice(0,10))).map(([day,rs])=>[day,rs.length]))
};
summary.monthly = Object.fromEntries(Object.entries(summary.monthly).map(([month,rs])=>[month,rs.length]));
fs.writeFileSync('evidence/analysis.json', JSON.stringify(summary,null,2)+'\n');
console.log(JSON.stringify({...summary,groups:summary.groups.map(({reports,...g})=>g)},null,2));
