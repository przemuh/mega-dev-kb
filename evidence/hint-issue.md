## Knowledge-base page

- [Signed SVX source](https://github.com/przemuh/mega-dev-kb/blob/main/page.svx)
- [Rendered page](https://github.com/przemuh/mega-dev-kb/blob/main/page.html)
- [Rendered page screenshot](https://github.com/przemuh/mega-dev-kb/blob/main/submission/4471-review.png)

## Problem

The booking-v3 form prints MM/DD/YYYY while parsing the input using the tenant day-first locale. People following the visible hint can get a swapped date. This affects form reports for Alder Physio, Copper Studio, and Pale Harbour; app/email reports for the same tenants remain parser reports.

## Scope and count

**33 distinct reports from ticket #4471** in the 2026-10-04 export. 3 tenants; received 2026-04-17 through 2026-09-22.

Deduplicated by report ID before filtering mergedInto=4471. Classification uses the supplied causeOf/groupByCause code, tenant locale via Intl.DateTimeFormat, tenant form version, and report channel. Browser locale, intake tag, and subject are not classification authority.

Intake tags within this group: {'parser': 15, 'hint': 18}.

## Verification

Run `npm run analyze` and `npm run build`. See `evidence/analysis.json`, `src/lib/kb/causes.ts`, `src/lib/kb/locales.ts`, the tenant directory, and the signed review at `src/routes/kb/incidents/4471-review/+page.svx`.

## Acceptance criteria

Render a hint matching the tenant date order and ensure the submitted and stored dates agree. Test all booking-v3 tenants and confirm this fix is independent of the shared parser.

## Report membership

R-41230, R-41241, R-41251, R-41259, R-41262, R-41275, R-41294, R-41305, R-41308, R-41366, R-41372, R-41384, R-41387, R-41396, R-41400, R-41406, R-41415, R-41416, R-41418, R-41428, R-41439, R-41441, R-41449, R-41453, R-41456, R-41460, R-41472, R-41485, R-41493, R-41539, R-41572, R-41582, R-41584

## Resolution from the desk

Closed as not planned / won’t fix: the course engineering update reports booking-v3 form retired. Ticket #4471 closed 2026-10-05. Retirement removes the affected form; the hint was not fixed.

Source: https://hq.mega.dev/challenges/what-it-shows (engineering update, read 2026-10-28).
