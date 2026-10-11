# Scroll plan: luisreche.dev

Self-authored under delegation. Luis asked for the skill to be applied to his page and gave no interview answers, so the six answers below are authored from what he has already said about the site and the CV.

## 1. Brief

1. **What, for whom, belief, action.** The portfolio of Luis Reche, for people who hire or contract product engineers. Belief to install: coding agents write his code, and he is the one who decides what gets built and answers for what ships. One action: write to him. The label is his email address, everywhere.
2. **Vibe.** Sober, printed, exact, quiet. References: his own two-page CV, a proofreader's blue pencil on a galley, a ship's log.
3. **Journey in his order.** The statement, then experience, then projects (ClipHub and Gravity Room first), then stack and education, then contact.
4. **Feeling.** Calm almost everywhere. One intense moment: ClipHub, his flagship. The thing to remember is that everything listed actually shipped.
5. **The one thing.** A log of what he shipped that fills in beside the text as the reader passes each product.
6. **Range and assets.** Editorial and minimal: flat cream paper or near-black in dark mode, no gradients, one statement at large size. Assets: four product screenshots in `public/shots`, type. No footage.

Hard rules from Luis: the employer appears only in Experience, never in the hero or metadata. No language singled out in the headline. Experience above Projects. No "human in the loop" wording. No invented numbers; every figure on the page is one he gave or one read from Search Console.

## 2. Journey

1. Claim: who writes the code and who answers for it.
2. Record: where he has done it for someone else.
3. Flagship: ClipHub, the product that proves it.
4. Range: the other things he shipped.
5. Substance: stack, education, languages.
6. Commitment: the log, complete, and his address.

## 3. Feeling curve

1. Curiosity: one statement on paper whose weight moves from the agents' sentence to his as the reader scrolls.
2. Trust: plain rows of dated work, nothing moving but the entry.
3. Delight: the frame holds, the ClipHub screenshot wipes in, the real figures land, three facts arrive one by one.
4. Appetite: three more products pass at reading pace, each screenshot drifting inside its frame.
5. Calm: short lists.
6. Resolve: the page stops on a ten-line record of everything passed and one address.

**Peak.** "You get to ClipHub, the page holds still, the screenshot slides open and the numbers count up to 130 releases." Beat 3.

**Tell-someone.** It's the site where a log in the margin fills in with everything he shipped as you read, and the last page is just that log and his email.

**Authored silence.** None. The quiet before the peak is the Experience chapter, which is text only.

## 4. Structure

**Grammar: chaptered editorial.** The page is a CV, long-form substance on paper, and Luis asked for flat paper and one statement. Filmic one-shot needs footage he does not have. Typographic poster forbids the product screenshots he likes. Gallery forbids a hero claim. Live surface would need a product demo, and this is a person.

| Shape | Decision |
|---|---|
| Grammar | Chaptered editorial |
| Nav | No bar. A margin folio that names the current chapter, with the ship log under it. On a phone the log is one line fixed at the bottom |
| Hero | A title page of type on paper, anchored to the lead edge, no media |
| Act sequence | pin with kinetic weight, flow, pin with reveal and count, parallax, in/stagger, progress. Six acts |
| Close | A colophon: the complete log in small type, then the email as a line of running text |
| Signature move | The ship log: one line stamped per shipped product as the reader passes it, each line a link back |

**sites.md check.** The file has no lines yet, so there is nothing to repeat.

## 5. Score

| Beat | Device | Span | Why this one |
|---|---|---|---|
| Claim | pin + kinetic | 1.5 | The statement holds while its weight moves, which is the claim itself |
| Record | flow | n/a | Dated rows are information and should read at the reader's pace |
| Flagship | reveal (pinned, with cues) | 2.6 | A wipe is a change of state: from reading about work to looking at it |
| Range | parallax | n/a | Breadth at reading pace; the drift keeps the screenshots alive without a second pin |
| Substance | in/stagger | n/a | Lists are information, entered quickly |
| Commitment | progress | n/a | The log, driven by the whole page's scroll, is complete here |

Peak span is 2.6 against 1.5 for the only other pin. The act before the peak is text only.

## 6. Assets

| Beat | Asset |
|---|---|
| Flagship | `public/shots/cliphub.webp` (1280x800) |
| Range | `public/shots/gravity-room.webp`, `piroboom.webp`, `socialpro.webp` (1280x800) |

No clips, so no encoding.

## 7. Verification and feel check

**Harness (2026-10-11).** `shoot.ts` against the production build, prerendered: desktop 1440x900, phone 390x844 and desktop with reduced motion. All three report no findings. A fourth run at 375x667 also reports none.

Fixed on the way:

- The three ClipHub facts were set in the soft ink and came back `contrast-thin`. They are now in full ink.
- On a phone the pinned ClipHub stage was taller than the screen and clipped its title. Below the wide layout it now starts at the top, crops the screenshot to 16:9 and drops the kind line and the caption. Under 740px of height it also drops the figures and the links, which the log line at the bottom repeats.
- The log only stamped lines the reader scrolled through, so a jump down the page left gaps. Passing one line now stamps every line before it.

**Not verified.** No real-phone pass: the page was not opened on a physical phone, and it has no clips, so the device diagnostic does not apply. Safari and Firefox were not opened. Firefox gets the settled page: his sentence in ink, the agents' sentence dimmed, the screenshot open. Focus order was read from the DOM, not tabbed by hand.

**Feel check.**

| Act | Intended | Felt |
|---|---|---|
| Claim | Curiosity | Curiosity |
| Record | Trust | Trust |
| Flagship | Delight | Arrival: the first dark image on a page of paper |
| Range | Appetite | More of the same by the third screenshot |
| Substance | Calm | Calm |
| Commitment | Resolve | Resolve |

The peak reads as the peak: it is the largest change on the sheet and has the longest pin, and the act before it is text only. The end resolves: the last screen holds the record, the address and the footer.

Changed after the check: on a wide screen the margin log now leaves when the colophon arrives, because the two were side by side saying the same thing. Range was left as built. Its third screenshot (SocialPro) is already a smaller figure sharing a row with the two text-only projects, and the act still thins out there; a fourth dark screenshot in a row is the cause, and only different imagery would fix it.

**Review fixes (2026-10-11).** A review limited to what a visitor can run into found nine problems, all fixed:

- A pinned stage clipped whatever did not fit one viewport (a phone on its side, 200% zoom). Acts now unpin when their content is taller than the viewport.
- Without scroll timelines the pins held a frozen frame for 0.7 and 1.6 screens. Those browsers get unpinned acts.
- Printing left unseen sections blank. Print now gets the settled page on light tokens.
- A wrong URL showed the home page first. The build writes `404.html` with an empty root and the catch-all rewrite is gone.
- A blocked bundle left the reveals hidden for good. The inline script drops `sc-js` after 3 s if the app has not started.
- The ClipHub link in the log landed on the stage before anything had opened. It now lands late in the pin.
- The figures showed their final value and then restarted from 0. They are static now.
- Copying the headline pasted his sentence twice. The words are plain inline text, with no hidden duplicate.
- "Shipped" sat over an empty list, and the log left the margin before the record appeared. Both are tied to what is on screen.

Checked: harness clean at 1440x900, 390x844, 844x390 and reduced motion; the print PDF read page by page; the no-timeline layout simulated in Chrome. Still not opened in a real Firefox (headless capture hung on this machine), and `404.html` is only proven once Vercel serves the preview.
