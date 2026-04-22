# Prompt A/B Eval Harness

Tiny harness for running ON-vs-OFF ablations on `prompts.rs` directives against fixed scenarios. Output is side-by-side markdown you read by eye.

## Why this exists

`reports/2026-04-21-craft-stack-audit.md` ranked the highest-stakes directives in the prompt file. This harness is how you find out whether the audit's hunches are right.

## Setup

```bash
cd scripts/eval
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env to point at your model. Examples:
#   - LM Studio (local):  LLM_BASE_URL=http://localhost:1234/v1, LLM_API_KEY=lm-studio, LLM_MODEL=<your-loaded-model>
#   - OpenAI:             LLM_BASE_URL=https://api.openai.com/v1, LLM_API_KEY=sk-..., LLM_MODEL=gpt-4o-mini
#   - Anthropic via proxy: see provider docs
```

## Run

```bash
python run_eval.py E1            # one experiment
python run_eval.py E1 E2 E4      # several
python run_eval.py all           # all experiments
```

Results land in `results/<experiment>/<scenario>.md` as side-by-side panels.

## Cost guardrails

The harness prints an **estimated total token count + per-experiment cost** before any API call and waits for `y` to proceed. Defaults to 3 samples per scenario per condition. Tune in `config.yaml` if needed. Set `LLM_DRY_RUN=1` to print prompts without calling the API.

## What's wired up

| ID | Question being asked |
|----|----|
| E1 | Does the whole `craft_notes_dialogue` block (4,826 tokens) earn its keep? |
| E2 | Does `AGAPE_BLOCK` (867 tokens) noticeably change tone/pacing? |
| E3 | Is "Humorous" tone actually distinguishable from Auto? |
| E4 | Does cutting the suspected-placebo half of craft notes degrade quality? |

Each experiment is defined by an `ablations.yaml` entry that says "remove these line ranges from the assembled system prompt." Scenarios live in `scenarios.yaml` — short user turns with character context, designed to make the directive's claimed effect observable if it exists.

## Adding experiments

1. Add a new entry to `ablations.yaml` with a name and the line ranges to ablate.
2. Add scenarios to `scenarios.yaml` that should make the directive's effect visible.
3. `python run_eval.py <new-experiment-id>`.

## Limitations

- This harness assembles a *simplified* system prompt — no per-character inventory, no canon, no daily reading. It's enough to test whether a directive shifts the model's *register*. It's not enough to validate end-to-end production behavior.
- Three samples per condition is the minimum to see if anything moves. For decisions you'd actually act on, bump samples to 10 in `config.yaml`.
- Scoring is by-eye. There's a `scoring_template.md` per result file with five dimensions you can fill in.
