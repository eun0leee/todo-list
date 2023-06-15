const clock = (element) => {
  const clockEl = document.querySelector(element);
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  clockEl.innerText = `${hours}:${minutes}:${seconds}`;
};

setInterval(clock, 1000, '.taskbar-clock');

export default clock;
