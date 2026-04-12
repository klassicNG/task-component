# Todo Item Card — Frontend Wizards Stage 0

A testable, accessible, and responsive Todo Card component built with semantic HTML, vanilla CSS, and JavaScript. No frameworks, no build step — just drop it in a browser or deploy it anywhere that serves static files.

---

## Live Demo

> [https://your-username.github.io/todo-card](https://your-username.github.io/todo-card)  
> *(replace with your actual URL after deploying)*

---

## Features

- All required `data-testid` attributes for automated testing
- Semantic HTML — `<article>`, `<time>`, `<ul>`, `<button>`, real `<input type="checkbox">`
- Fully accessible — ARIA labels, live regions, visible focus styles, keyboard navigation
- Dynamic time remaining — calculates from a fixed due date, updates every 60 seconds
- Checkbox toggle — strikes through title, updates status badge to "Done"
- Responsive — works from 320px to 1200px with no horizontal overflow

---

## Project Structure

```
todo-card/
├── index.html   # Markup and structure
├── style.css    # All styles
├── script.js    # Time remaining logic + interactivity
└── README.md
```

---

## data-testid Reference

| Element | data-testid | Tag |
|---|---|---|
| Card root | `test-todo-card` | `<article>` |
| Task title | `test-todo-title` | `<h2>` |
| Description | `test-todo-description` | `<p>` |
| Priority badge | `test-todo-priority` | `<span>` |
| Due date | `test-todo-due-date` | `<time>` |
| Time remaining | `test-todo-time-remaining` | `<span>` |
| Status indicator | `test-todo-status` | `<span>` |
| Completion toggle | `test-todo-complete-toggle` | `<input type="checkbox">` |
| Tags list | `test-todo-tags` | `<ul>` |
| Work tag | `test-todo-tag-work` | `<li>` |
| Urgent tag | `test-todo-tag-urgent` | `<li>` |
| Edit button | `test-todo-edit-button` | `<button>` |
| Delete button | `test-todo-delete-button` | `<button>` |

---

## Behaviour

### Time Remaining
Calculated against a fixed due date (`2026-04-15T18:00:00Z`). Outputs friendly text:

| Condition | Output |
|---|---|
| More than 1 day away | `Due in N days` |
| Exactly 1 day | `Due tomorrow` |
| Less than 24 hours | `Due in N hr` |
| Less than 60 minutes | `Due now!` |
| Past due | `Overdue by N days / hr / min` |

Updates every 60 seconds via `setInterval`.

### Checkbox Toggle
When checked:
- Title gets a strikethrough
- Status badge switches to **Done**
- Card accent stripe fades to green

When unchecked, everything reverts.

### Edit / Delete
- Edit → `console.log("edit clicked")`
- Delete → `alert("Delete clicked")`

---

## Accessibility

- Checkbox has a visually-hidden `<label>` and `aria-label`
- All buttons have `aria-label` for icon-only contexts
- Priority and status badges include `aria-label`
- Time remaining is wrapped in `aria-live="polite"`
- Focus rings visible on all interactive elements (amber outline)
- Tab order: **checkbox → edit → delete**

---

## Deploying to GitHub Pages

```bash
# 1. Initialise repo
git init
git add .
git commit -m "feat: add todo card"

# 2. Create repo and push (GitHub CLI)
gh repo create todo-card --public --source=. --remote=origin --push

# 3. Enable Pages
gh api repos/{your-username}/todo-card/pages \
  --method POST \
  -f build_type=legacy \
  -f source.branch=main \
  -f source.path=/
```

Your site will be live at `https://{your-username}.github.io/todo-card` within ~90 seconds.

---

## Tech Stack

- HTML5
- CSS3 (custom properties, flexbox, media queries)
- Vanilla JavaScript (ES6+)
- [Fraunces](https://fonts.google.com/specimen/Fraunces) — display serif
- [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) — monospace metadata
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) — body / UI

---

## License

MIT
