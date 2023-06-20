const clock = (element: string) => {
  const clockEl = document.querySelector(element);
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  if (!clockEl) return;
  clockEl.textContent = `${hours}:${minutes}:${seconds}`;
};

export default clock;
