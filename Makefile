# Doc / parity gates (Unix). From repo root: `make doc-check`
.PHONY: doc-check
doc-check:
	./scripts/check-homepage-practice-fragment-sync.sh
	./scripts/check-chooser-phrasing.sh

.PHONY: sync-homepage-practice
sync-homepage-practice:
	./scripts/sync-homepage-practice-fragment.sh
