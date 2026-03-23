# Translation Philosophy

Translations on this site are **not literal** — they are marketing-first adaptations written for a global tech audience.

## Who We're Marketing

**Bill McHenry** is a Principal Product Manager. His professional brand centers on:

- Delivering products that create real value for end users — not just shipping code
- Data-driven, problem-solving leadership
- Strategic, credible, and forward-thinking positioning

Every translated string should reinforce this image. When in doubt, ask: _does this make Bill sound like a credible senior PM to a native speaker in this market?_

## Core Principles

**Adapt, don't translate**
The goal is copy that sounds like it was written by a native-speaking tech copywriter — not English run through a translation engine. Idioms, metaphors, and sentence structure should all be adapted to what feels natural in the target language.

**Use tech/startup register**
Use the language and vocabulary a native speaker would encounter in that country's tech and startup ecosystem. Avoid overly formal or academic phrasing.

**Hybrid terms are encouraged**
Where a borrowed English term is genuinely how native speakers talk, use it. Examples:

- Hindi: `डेटा-ड्रिवन`, `प्रोडक्ट लीडर`
- French: `data-driven`, `roadmap`
- Japanese: `プロダクトマネージャー`

**Headlines are punchy**
Short, label-style strings (nav items, section headings, button text) should be concise — not adapted into full sentences.

**Elevate weak source copy**
If the English is generic or flat, the translated version should be stronger. This is marketing copy — the AI is instructed to improve it, not just match it.

## Changing the Prompt

The system prompt lives in `buildSystemPrompt()` in `scripts/translate.js`. If translations feel too literal, flat, or off-brand, update that function and rerun with `--force`:

```bash
node scripts/translate.js --locale <code> --namespace <ns> --force
```

The model is `gpt-4o` by default. Pass `--model` to override.
