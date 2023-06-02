const clock = (element) => {
  const clockEl = document.querySelector(element);
  const hours = String(new Date().getHours()).padStart('2', 0);
  const minutes = String(new Date().getMinutes()).padStart('2', 0);
  const seconds = String(new Date().getSeconds()).padStart('2', 0);

  clockEl.innerText = `${hours}:${minutes}:${seconds}`;
};

export default clock;
