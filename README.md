# Ticket #4471: evidence review

The course export groups two independent date problems into one support ticket.

- [Parser issue #1](https://github.com/przemuh/mega-dev-kb/issues/1): 379 distinct reports.
- [Form hint issue #2](https://github.com/przemuh/mega-dev-kb/issues/2): 33 distinct reports.
- [Signed review source](src/routes/kb/incidents/4471-review/+page.svx).
- [Rendered review HTML](rendered/kb/incidents/4471-review/index.html), generated from the actual Svelte/mdsvex components.
- [Computed evidence and report memberships](evidence/analysis.json).

Five one-day observations remain within the parser count under the supplied classifier; they need follow-up, not an invented third diagnosis. The original accepted decision remains intact.

## Reproduce

Requires Node.js 22.12+ (validated with Node 24).

```sh
npm ci
npm run analyze
npm run build
python3 -m http.server 4831 --bind 127.0.0.1 --directory rendered
```

Open http://127.0.0.1:4831/kb/incidents/4471-review/ to inspect the rendered page, or `/kb/` for the index. The generated HTML includes server-rendered content and the production CSS/JavaScript assets; the cause explorer hydrates into an interactive component. No model API or production support service is called.

`npm run analyze` deduplicates IDs, filters ticket #4471, applies the original classifier using tenant configuration, and saves reproducible evidence. Rebuild after any desk data update; update issue counts and memberships from that evidence.

## Verification

- Original export: 427 rows, 412 distinct IDs, 15 overlap rows.
- Classifier: 379 parser + 33 hint = 412; no unplaced reports.
- 38 intake tags disagree with the tenant classifier.
- 184 merges on July 2, including 183 reports received earlier.
- Browser check: switching report A from form to app changes the explorer from different causes to same cause.
- Signed page renders its desk reference through the original RenderStamp component.

## Original export README

# kb — the support knowledge base

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.
