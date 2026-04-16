(function () {
  /* ── State ── */
  const DUE_DEFAULT = new Date("2026-04-17T23:59:00Z");

  const state = {
    title: "Redesign the onboarding flow",
    description:
      "Audit the current 6-step onboarding, reduce friction points, and ship a streamlined 3-step version with inline validation and live progress cues. Coordinate with the design system team for component reuse and run usability tests on the new flow before launch.",
    priority: "high", // low | medium | high
    status: "in-progress", // pending | in-progress | done
    dueDate: DUE_DEFAULT,
  };
  let prevState = null;
  const COLLAPSE_THRESHOLD = 120;

  /* ── Element refs ── */
  const card = document.querySelector('[data-testid="test-todo-card"]');
  const cardInner = card.querySelector(".card-inner");
  const stripe = card.querySelector(".card-stripe");
  const priIndicator = card.querySelector(
    '[data-testid="test-todo-priority-indicator"]',
  );
  const titleEl = card.querySelector('[data-testid="test-todo-title"]');
  const priBadge = card.querySelector('[data-testid="test-todo-priority"]');
  const priBadgeDot = priBadge.querySelector(".priority-dot");
  const checkbox = card.querySelector(
    '[data-testid="test-todo-complete-toggle"]',
  );
  const overdueEl = card.querySelector(
    '[data-testid="test-todo-overdue-indicator"]',
  );
  const collapsible = card.querySelector(
    '[data-testid="test-todo-collapsible-section"]',
  );
  const descEl = card.querySelector('[data-testid="test-todo-description"]');
  const expandToggle = card.querySelector(
    '[data-testid="test-todo-expand-toggle"]',
  );
  const statusBadge = card.querySelector('[data-testid="test-todo-status"]');
  const statusControl = card.querySelector(
    '[data-testid="test-todo-status-control"]',
  );
  const dueDateEl = card.querySelector('[data-testid="test-todo-due-date"]');
  const timeRemEl = card.querySelector(
    '[data-testid="test-todo-time-remaining"]',
  );
  const editBtn = card.querySelector('[data-testid="test-todo-edit-button"]');
  const deleteBtn = card.querySelector(
    '[data-testid="test-todo-delete-button"]',
  );
  const editTitleInput = card.querySelector(
    '[data-testid="test-todo-edit-title-input"]',
  );
  const editDescInput = card.querySelector(
    '[data-testid="test-todo-edit-description-input"]',
  );
  const editPriSelect = card.querySelector(
    '[data-testid="test-todo-edit-priority-select"]',
  );
  const editDueInput = card.querySelector(
    '[data-testid="test-todo-edit-due-date-input"]',
  );
  const saveBtn = card.querySelector('[data-testid="test-todo-save-button"]');
  const cancelBtn = card.querySelector(
    '[data-testid="test-todo-cancel-button"]',
  );

  /* ── Priority helpers ── */
  const PRI_LABELS = { high: "High", medium: "Medium", low: "Low" };
  function applyPriority(p) {
    ["pri-high", "pri-medium", "pri-low"].forEach((c) => {
      priIndicator.classList.remove(c);
      stripe.classList.remove(c);
      priBadge.classList.remove(c);
    });
    priIndicator.classList.add("pri-" + p);
    stripe.classList.add("pri-" + p);
    priBadge.classList.add("pri-" + p);
    priBadge.childNodes[priBadge.childNodes.length - 1].textContent =
      " " + PRI_LABELS[p];
    priBadge.setAttribute("aria-label", "Priority: " + PRI_LABELS[p]);
  }

  /* ── Status helpers ── */
  const STATUS_MAP = {
    pending: {
      cls: "status-pending",
      label: "Pending",
      aria: "Status: Pending",
    },
    "in-progress": {
      cls: "status-in-progress",
      label: "In Progress",
      aria: "Status: In Progress",
    },
    done: { cls: "status-done", label: "Done", aria: "Status: Done" },
  };
  function applyStatus(s) {
    const m = STATUS_MAP[s];
    statusBadge.className = m.cls;
    statusBadge.textContent = m.label;
    statusBadge.setAttribute("aria-label", m.aria);
    statusControl.value = s;
    checkbox.checked = s === "done";
    checkbox.setAttribute("aria-checked", s === "done" ? "true" : "false");
    titleEl.classList.toggle("done", s === "done");
    card.classList.toggle("done-state", s === "done");
  }

  /* ── Time remaining ── */
  function friendlyRemaining() {
    if (state.status === "done")
      return { text: "Completed", cls: "tr-completed" };
    const diff = state.dueDate.getTime() - Date.now();
    const absMin = Math.abs(Math.round(diff / 60000));
    const absHr = Math.abs(Math.round(diff / 3600000));
    const absDay = Math.abs(Math.round(diff / 86400000));
    if (diff < 0) {
      if (absMin < 60)
        return { text: `Overdue by ${absMin} min`, cls: "tr-overdue" };
      if (absHr < 24)
        return { text: `Overdue by ${absHr} hour`, cls: "tr-overdue" };
      return { text: `Overdue by ${absDay} days`, cls: "tr-overdue" };
    }
    const min = Math.round(diff / 60000);
    const hr = Math.round(diff / 3600000);
    const day = Math.round(diff / 86400000);
    if (min < 60) return { text: `Due in ${min} min`, cls: "tr-soon" };
    if (hr < 24) return { text: `Due in ${hr} hour`, cls: "tr-soon" };
    if (day === 1) return { text: "Due tomorrow", cls: "tr-soon" };
    return { text: `Due in ${day} days`, cls: "tr-fine" };
  }

  function updateTime() {
    const { text, cls } = friendlyRemaining();
    timeRemEl.textContent = text;
    timeRemEl.className = cls;
    timeRemEl.setAttribute("aria-label", "Time remaining: " + text);
    const overdue = cls === "tr-overdue";
    overdueEl.classList.toggle("visible", overdue);
  }

  /* ── Due date display ── */
  function formatDueDate(d) {
    return (
      "Due " +
      d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    );
  }
  function applyDueDate(d) {
    const iso = d.toISOString().slice(0, 10);
    dueDateEl.setAttribute("datetime", d.toISOString());
    dueDateEl.textContent = formatDueDate(d);
    dueDateEl.setAttribute("aria-label", "Due date: " + formatDueDate(d));
  }

  /* ── Expand / Collapse ── */
  function initExpandToggle() {
    const needsToggle = state.description.length > COLLAPSE_THRESHOLD;
    expandToggle.classList.toggle("visible", needsToggle);
    if (!needsToggle) {
      collapsible.classList.remove("collapsed");
      collapsible.classList.add("expanded");
    }
  }

  expandToggle.addEventListener("click", function () {
    const expanded = collapsible.classList.contains("expanded");
    if (expanded) {
      collapsible.classList.replace("expanded", "collapsed");
      this.textContent = "Show more ↓";
      this.setAttribute("aria-expanded", "false");
      this.setAttribute("aria-label", "Show full description");
    } else {
      collapsible.classList.replace("collapsed", "expanded");
      this.textContent = "Show less ↑";
      this.setAttribute("aria-expanded", "true");
      this.setAttribute("aria-label", "Collapse description");
    }
  });

  /* ── Edit mode ── */
  function enterEditMode() {
    prevState = { ...state };
    editTitleInput.value = state.title;
    editDescInput.value = state.description;
    editPriSelect.value = state.priority;
    editDueInput.value = state.dueDate.toISOString().slice(0, 10);
    cardInner.classList.add("editing");
    editTitleInput.focus();
  }

  function exitEditMode(save) {
    if (save) {
      state.title = editTitleInput.value.trim() || state.title;
      state.description = editDescInput.value.trim() || state.description;
      state.priority = editPriSelect.value;
      const newDate = new Date(editDueInput.value + "T23:59:00Z");
      if (!isNaN(newDate)) state.dueDate = newDate;
      renderAll();
    } else {
      Object.assign(state, prevState);
    }
    cardInner.classList.remove("editing");
    editBtn.focus();
  }

  function renderAll() {
    titleEl.textContent = state.title;
    descEl.textContent = state.description;
    applyPriority(state.priority);
    applyStatus(state.status);
    applyDueDate(state.dueDate);
    initExpandToggle();
    updateTime();
  }

  /* ── Event listeners ── */
  editBtn.addEventListener("click", enterEditMode);
  saveBtn.addEventListener("click", () => exitEditMode(true));
  cancelBtn.addEventListener("click", () => exitEditMode(false));
  deleteBtn.addEventListener("click", () => alert("Delete clicked"));

  checkbox.addEventListener("change", function () {
    state.status = this.checked ? "done" : "pending";
    applyStatus(state.status);
    updateTime();
  });

  statusControl.addEventListener("change", function () {
    state.status = this.value;
    applyStatus(state.status);
    updateTime();
  });

  /* ── Init ── */
  renderAll();
  setInterval(updateTime, 30000);
})();
