(function () {
  const DUE = new Date("2026-04-15T18:00:00Z");

  function friendlyRemaining() {
    const now = Date.now();
    const diffMs = DUE.getTime() - now;
    const diffMin = Math.round(diffMs / 60000);
    const diffHr = Math.round(diffMs / 3600000);
    const diffDay = Math.round(diffMs / 86400000);

    if (diffMs < 0) {
      const absMin = Math.abs(diffMin);
      const absHr = Math.abs(diffHr);
      const absDay = Math.abs(diffDay);
      if (absMin < 60)
        return { text: `Overdue by ${absMin} min`, cls: "overdue" };
      if (absHr < 24) return { text: `Overdue by ${absHr} hr`, cls: "overdue" };
      return { text: `Overdue by ${absDay} days`, cls: "overdue" };
    }
    if (diffMin < 60) return { text: "Due now!", cls: "overdue" };
    if (diffHr < 24) return { text: `Due in ${diffHr} hr`, cls: "soon" };
    if (diffDay === 1) return { text: "Due tomorrow", cls: "soon" };
    return { text: `Due in ${diffDay} days`, cls: "fine" };
  }

  function updateTime() {
    const el = document.querySelector(
      '[data-testid="test-todo-time-remaining"]',
    );
    const { text, cls } = friendlyRemaining();
    el.textContent = text;
    el.className = cls;
    el.setAttribute("aria-label", "Time remaining: " + text);
  }

  updateTime();
  setInterval(updateTime, 60000);

  /* Checkbox toggle behaviour */
  const checkbox = document.querySelector(
    '[data-testid="test-todo-complete-toggle"]',
  );
  const title = document.querySelector('[data-testid="test-todo-title"]');
  const status = document.querySelector('[data-testid="test-todo-status"]');
  const card = document.querySelector('[data-testid="test-todo-card"]');

  checkbox.addEventListener("change", function () {
    const done = this.checked;
    this.setAttribute("aria-checked", done ? "true" : "false");

    title.classList.toggle("done", done);

    if (done) {
      status.textContent = "Done";
      status.className = "status-done";
      status.setAttribute("aria-label", "Status: Done");
      card.classList.add("completed");
    } else {
      status.textContent = "In Progress";
      status.className = "status-in-progress";
      status.setAttribute("aria-label", "Status: In Progress");
      card.classList.remove("completed");
    }
  });

  /* Edit button */
  document
    .querySelector('[data-testid="test-todo-edit-button"]')
    .addEventListener("click", () => console.log("edit clicked"));

  /* Delete button */
  document
    .querySelector('[data-testid="test-todo-delete-button"]')
    .addEventListener("click", () => alert("Delete clicked"));
})();
