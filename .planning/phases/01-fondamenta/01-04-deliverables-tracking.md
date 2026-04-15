# Phase 1 — Client Deliverables Tracking

**Plan:** 01-04
**Owner:** human (lead project)
**Status:** in progress
**Created:** 2026-04-15

Tre deliverable non-coding che sbloccano Phase 4, Phase 5, Phase 6. Vedi
`.planning/phases/01-fondamenta/01-CONTEXT.md` §"Client deliverables Phase 1"
e `.planning/phases/01-fondamenta/01-RESEARCH.md` §12 per contesto completo
e template email verbatim.

---

## D-25 — Fotografia cantieri/team/mezzi

**Unblocks:** Phase 4 (Portfolio), Phase 5 (Chi Siamo — team + fleet photos)
**Lead time:** 2–4 settimane dopo invio
**Owner:** human project lead

- [ ] sent: pending_human_send — template pronto, aggiornare con data reale invio
- [ ] acknowledged: pending
- [ ] expected_delivery: pending
- [ ] status: pending
- notes:
  - template email pronto da RESEARCH §12 D-25, da inviare al cliente

---

## D-26 — PDF attestazioni SOA + ISO

**Unblocks:** Phase 5 (Chi Siamo — certificazioni card + PDF download)
**Lead time:** giorni (dipende da chi ha gli originali)
**Owner:** human project lead

- [ ] sent: pending_human_send — template pronto, aggiornare con data reale invio
- [ ] acknowledged: pending
- [ ] expected_delivery: pending
- [ ] status: pending
- notes:
  - template email pronto da RESEARCH §12 D-26, da inviare al cliente

---

## D-27 — Resend DNS + Cloudflare Turnstile keys

**Unblocks:** Phase 6 (Contatti form — transactional email + spam protection)
**Lead time:** ore per account creation, fino a 24h per DNS propagation
**Owner:** human (lead dev / account admin)

### D-27a — Resend domain verification

- [ ] account_created: pending_human_action — istruzioni pronte sotto
- [ ] domain_added: pending
- [ ] dns_records_pasted: pending
- [ ] resend_status: not_started
- notes:
  - istruzioni operative complete pronte da RESEARCH §12 D-27a

### D-27b — Cloudflare Turnstile keys

- [ ] account_created: pending_human_action — istruzioni pronte sotto
- [ ] widget_created: pending
- [ ] keys_saved_to_password_manager: pending
- [ ] turnstile_status: not_started
- notes:
  - istruzioni operative complete pronte da RESEARCH §12 D-27b
  - ricordarsi di aggiungere `*.vercel.app` agli hostname nel widget (obbligatorio per preview deploy)

---

## Closure checklist (Phase 1 exit)

- [ ] D-25 status is `sent` or `acknowledged` (NOT `pending`)
- [ ] D-26 status is `sent` or `acknowledged` (NOT `pending`)
- [ ] D-27a resend_status is `dns_pasted` or `verified` (NOT `not_started`)
- [ ] D-27b turnstile_status is `keys_saved` or `done` (NOT `not_started`)

Phase 1 può chiudere quando tutti e 4 i punti sopra sono checkati. Le consegne reali
(foto da cliente, PDF, DNS propagation completa) possono arrivare dopo — ciò
che blocca Phase 1 è l'INIZIO formale dei tre processi, non il loro completamento.
