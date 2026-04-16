(function () {
  const timeEl = document.querySelector('[data-testid="test-user-time"]');

  function updateTime() {
    const ms = Date.now();
    timeEl.textContent = ms.toLocaleString();
    timeEl.setAttribute("aria-label", "Current time in milliseconds: " + ms);
  }

  updateTime();
  setInterval(updateTime, 1000);
})();
