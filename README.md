# Aude.ai — Coaching Feature

A coaching feature for Aude.ai, an AI performance platform for engineering teams. It turns an AI-generated performance insight into a structured growth conversation with a manager, with a shared plan both people build and return to.

**Role:** Product designer, led the feature end to end
**Context:** Industry project, team of 4 designers + CEO and PM
**Outcome:** Engineer platform adoption up ~40%

---

## Scope

I owned the coaching feature from an open problem space through to a tested, shipped flow, the research synthesis, the direction, the key decisions and tradeoffs, and a working prototype built in Cursor and tested with users. Research was shared across the team; coaching was mine to lead.

## The problem

Aude.ai connects to the tools engineers already use (GitHub, Slack, meeting tools) and turns that activity into AI performance insights. It was good at telling engineers where they were falling short and gave them no way to act on it, and adoption was dropping.

Research surfaced four reasons:

- No trust in feedback they couldn't see the reasoning behind
- No next step once they understood the feedback
- No human in the loop, they wanted coaching from their manager, not AI alone
- Too much text, everything had the same visual weight, so people skimmed and disengaged

The gap was structural: the platform described performance but did nothing to help people change it.

## Goal

Close the gap between insight and action, and do it in a way engineers actually trusted, so the platform earned a reason to come back.

## Challenges

- **An undefined problem space.** Coaching was the least-defined of three opportunity areas. I took it on purpose and resolved the ambiguity by prototyping and testing early rather than debating.
- **My first idea was wrong.** I designed an AI-driven practice sandbox, prototyped it, and tested it with engineers. It failed, it cost people time, and they wouldn't hand their whole growth to AI. I dropped it. That failure produced the principle the final design was built on: AI surfaces and suggests, a human decides.
- **A hidden anonymity risk.** Peer feedback is anonymous, but AI turns it into a specific visible pattern. On a small team, that's enough to guess who said what. I added a threshold so a pattern can't surface until enough different people raise it.
- **A limit design couldn't fully solve.** Coaching had to feel separate from formal evaluation. Design can enforce that structurally (no data linkage, pair-only visibility, access logging) but can't guarantee a manager's private judgment. I named that limit honestly instead of overselling it.
- **Two opposed users, one surface.** Engineers wanted safety and low friction; managers wanted context without a time burden. The flow had to serve both without favoring either.

## Solution

An engineer sees a performance pattern and can turn it into a coaching request in a few steps, instead of hitting a dead end. The manager accepts, they meet on a shared board where they set goals together, and it becomes a record they return to over time.

Key decisions:

- Feedback shown as sized patterns, not walls of text, so what matters most is visible before reading a word
- Coaching placed right at the insight, not in a separate menu, help where confusion happens
- A low-friction request overlay carrying the evidence, recipient, and desired outcome, with a visible pending state
- A clear "not used for evaluation" line at the moment someone joins a session
- Always-on transcription paired with human review, AI drafts and answers questions, the two people decide what becomes part of the record

The principle under all of it: AI surfaces and suggests, a human decides.

## Impact

Metrics chosen to test whether the design changed real behavior, not just the numbers.

- **Adoption, up ~40%** — the main measure, because people only keep using a tool that earns a place in their routine
- **Insight-to-action, 5–7 minutes** — the specific behavior the design was meant to create, going from seeing an insight to acting on it; before, there was no path at all
- **Satisfaction, 70%** — a check that adoption rose because the experience was genuinely better and trusted, not for outside reasons
- **Follow-through** — confirmed requests turned into finished sessions with a plan, so the design held end to end

The clearest signal was qualitative: engineers said the feature finally gave their feedback a way to turn into real growth with their manager involved, the exact gap research found at the start.

---

*Case study: [ananyadesign.me](https://ananyadesign.me)*
