# Frontend Wizards — HNG Internship

Stage 0 → Stage 1A → Stage 1B components. All built with semantic HTML, vanilla CSS, and vanilla JS. No frameworks, no build step.

---

## Live Demos

| Task                          | URL                                                                |
| ----------------------------- | ------------------------------------------------------------------ |
| Stage 0 — Todo Card           | `https://klassicng.github.io/task-component/`                      |
| Stage 1A — Advanced Todo Card | `https://klassicng.github.io/task-component/stage-1/todo-card/`    |
| Stage 1B — Profile Card       | `https://klassicng.github.io/task-component/stage-1/profile-card/` |

_(Replace `your-username` after deploying)_

---

## Project Structure

```
todo-card/
├── index.html, style.css & main.js                    # Stage 0 — Todo Card
├── stage-1/
│   ├── todo-card/
│   │   └── index.html, style.css & main.js            # Stage 1A — Advanced Todo Card
│   └── profile-card/
│       └── index.html, style.css & main.js            # Stage 1B — Profile Card
└── README.md
```

---

## Stage 0 — Todo Card

Basic todo card with all required `data-testid` attributes, semantic HTML, accessibility, and responsiveness.

**Features:** Status badge, priority badge, due date, time remaining (updates every 60s), checkbox completion toggle, Edit/Delete buttons, tag chips.

**data-testid reference:** `test-todo-card`, `test-todo-title`, `test-todo-description`, `test-todo-priority`, `test-todo-due-date`, `test-todo-time-remaining`, `test-todo-status`, `test-todo-complete-toggle`, `test-todo-tags`, `test-todo-tag-work`, `test-todo-tag-urgent`, `test-todo-edit-button`, `test-todo-delete-button`

---

## Stage 1A — Advanced Todo Card

All Stage 0 testids still present, plus the following enhancements.

### What changed from Stage 0

**Edit mode** — clicking Edit reveals an inline form with inputs for title, description, priority, and due date. Save commits changes; Cancel restores the previous state. Focus returns to the Edit button on close.

**Status control** — a `<select>` dropdown replaces the static status badge interaction. Checkbox, status badge, and status control all stay in sync bidirectionally.

**Priority indicator** — a 4px left border bar on the card body changes color (`red` / `amber` / `green`) based on the current priority level.

**Expand / collapse** — descriptions over 120 characters are collapsed by default. An accessible toggle reveals the full text, with `aria-expanded` and `aria-controls` wired correctly.

**Overdue indicator** — a pulsing red banner appears automatically when the due date has passed. Disappears when status is set to "Done".

**Granular time remaining** — now shows minutes (`Due in 45 min`), hours (`Due in 3 hours`), or days. Updates every 30 seconds. Freezes to "Completed" when status is Done.

### New data-testids

| Element                | data-testid                        |
| ---------------------- | ---------------------------------- |
| Edit form container    | `test-todo-edit-form`              |
| Title input            | `test-todo-edit-title-input`       |
| Description textarea   | `test-todo-edit-description-input` |
| Priority select        | `test-todo-edit-priority-select`   |
| Due date input         | `test-todo-edit-due-date-input`    |
| Save button            | `test-todo-save-button`            |
| Cancel button          | `test-todo-cancel-button`          |
| Status dropdown        | `test-todo-status-control`         |
| Priority indicator bar | `test-todo-priority-indicator`     |
| Expand/collapse toggle | `test-todo-expand-toggle`          |
| Collapsible container  | `test-todo-collapsible-section`    |
| Overdue banner         | `test-todo-overdue-indicator`      |

### Keyboard flow

`Tab` → Checkbox → Status control → Expand toggle → Edit → Delete

In edit mode: Title input → Description → Priority select → Due date → Save → Cancel

### Design decisions

- State is managed in a single `state` object; all UI updates go through `renderAll()` or targeted helpers to keep the display in sync
- Edit mode uses CSS class toggling (`editing`) on the card inner wrapper — no display manipulation in JS
- Bidirectional sync between checkbox and status control is handled in each listener by calling `applyStatus(state.status)` which updates all three elements at once

### Known limitations

- Focus trapping inside edit mode is not implemented (listed as optional in spec)
- No persistence — refreshing the page resets to the initial hardcoded values

---

## Stage 1B — Profile Card

### Features

- Avatar image with meaningful `alt` text
- Epoch time in milliseconds, updates every 1000ms with `aria-live="polite"`
- Social links (GitHub, Twitter, LinkedIn) open in new tab with `rel="noopener noreferrer"`
- Hobbies and dislikes as distinct labeled lists
- Responsive: stacked on mobile, side-by-side avatar/content on tablet and desktop

### data-testid reference

| Element                | data-testid                 |
| ---------------------- | --------------------------- |
| Card root              | `test-profile-card`         |
| Name                   | `test-user-name`            |
| Bio                    | `test-user-bio`             |
| Epoch time (ms)        | `test-user-time`            |
| Avatar image           | `test-user-avatar`          |
| Social links container | `test-user-social-links`    |
| GitHub link            | `test-user-social-github`   |
| Twitter link           | `test-user-social-twitter`  |
| LinkedIn link          | `test-user-social-linkedin` |
| Hobbies list           | `test-user-hobbies`         |
| Dislikes list          | `test-user-dislikes`        |

### Accessibility notes

- Avatar `alt` text describes the person and notes it is a placeholder
- `aria-live="polite"` on the time container — screen readers announce updates without interrupting
- Social links have individual `aria-label` values noting they open in a new tab
- Hobbies and dislikes lists are each associated with headings via `aria-labelledby`
- All links are keyboard focusable with a visible amber focus ring

---

## Running locally

No build step needed. Open any `index.html` directly in a browser:

```bash
# Option 1 — just open it
open stage-1/todo-card/index.html

# Option 2 — serve with Python (avoids any CORS issues)
python -m http.server 8080
# then visit http://localhost:8080
```

---

## Deploying updates

```bash
git add .
git commit -m "feat: add stage 1a and 1b"
git push
```

GitHub Pages redeploys automatically within ~60 seconds.

---

## Tech stack

- HTML5 (semantic elements: `article`, `section`, `nav`, `figure`, `time`, `header`)
- CSS3 (custom properties, flexbox, grid, transitions, media queries)
- Vanilla JS (ES6+, no dependencies)
- [Fraunces](https://fonts.google.com/specimen/Fraunces) — display serif
- [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) — monospace metadata
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) — body / UI

---

## License

MIT
